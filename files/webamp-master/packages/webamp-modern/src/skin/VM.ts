import { interpret } from "../maki/interpreter";
import { ParsedMaki } from "../maki/parser";
import { Variable } from "../maki/v";
import { UIRoot } from "../UIRoot";
import BaseObject from "./makiClasses/BaseObject";

import { classResolver } from "./resolver";

export default class Vm {
  _uiRoot: UIRoot; // actually only new Klass(uiRoot)
  _scripts: ParsedMaki[] = [];

  constructor(uiRoot: UIRoot) {
    this._uiRoot = uiRoot;
  }

  // This could easily become performance sensitive. We could make this more
  // performant by normalizing some of these things when scripts are added.
  dispatch1(object: BaseObject, event: string, args: Variable[] = []): number {
    const reversedArgs = [...args].reverse();
    let executed = 0;
    for (const script of this._scripts) {
      for (const binding of script.bindings) {
        if (
          script.methods[binding.methodOffset].name === event &&
          (script.variables[binding.variableOffset].value === object ||
            (script.variables[binding.variableOffset].isClass &&
              script.variables[binding.variableOffset].members.find(
                (vari) => script.variables[vari].value == object
              )))
        ) {
          if (event.startsWith("onleftbu")) {
            // debugger;
            console.log("EXEC EVENT:", event, binding);
          }
          this.interpret(script, binding.commandOffset, event, reversedArgs);
          executed++;
          // return 1;
        }
      }
    }
    if (event.startsWith("onleft")) {
      console.log("dispatched", executed, "x :", event, object._id);
    }
    return 0;
  }

  // This could easily become performance sensitive. We could make this more
  // performant by normalizing some of these things when scripts are added.
  async dispatch(object: BaseObject, event: string, args: Variable[] = []): number {
    const reversedArgs = [...args].reverse();
    let executed = 0;
    for (const script of this._scripts) {
      for (const binding of script.bindings) {
        if (script.methods[binding.methodOffset].name === event) {
          let match = false;
          // if(event.startsWith('onleftbu')){
          //   debugger;
          // }
          const binding_var = script.variables[binding.variableOffset];
          // if (binding_var.type === 'CLASS') {
          if (binding_var.isClass) {
            // const rootClass = classResolver(binding_var.guid);
            // if (object instanceof rootClass) {
            const found = binding_var.members.find((var_index) => {
              const member_var = script.variables[var_index];
              return member_var.value == object;
            });
            if (found != null) {
              // console.log('doEvent:', event, 'CLASS:', binding_var.guid, '@')
              binding_var.value = object;
              match = true;
            }
            // }
            // this.interpret(script, binding.commandOffset, reversedArgs);
            // // return 1;
            // executed ++;
          } else if (
            binding_var.type === "OBJECT" &&
            binding_var.value === object
          ) {
            match = true;
          }

          if (match) {
            await this.interpret(script, binding.commandOffset, event, reversedArgs);
            // return 1;
            executed++;
          }
        }
      }
    }
    // if(event.startsWith('onleft')){
    //   console.log('dispatched',executed,'x :', event, object._id)
    // }
    return executed;
    // return 0;
  }

  addScript(maki: ParsedMaki): number {
    const index = this._scripts.length;
    this._scripts.push(maki);
    return index;
  }

  async interpret(
    script: ParsedMaki,
    commandOffset: number,
    eventName: string,
    args: Variable[]
  ) {
    // try{
    await interpret(
      commandOffset,
      script,
      args,
      classResolver,
      eventName,
      this._uiRoot
    );
    // } catch {
    //   console.log('ERRORdah')
    // }
  }
}
