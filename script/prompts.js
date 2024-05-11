const categories = ["TV/Movies", "Person", "Animal", "Food", "Thing", "Place", "Fashion", "Games", "Architecture", "Plants"];
const styles = ["Anime/Manga", "Traditional", "Cubist", "Cartoon", "Impressionist", "3D", "Vector", "Sketchy", "Soft", "Abstract", "Pattern", "Photorealism", "Art Nouveau", "Art Deco", "Brutalism", "Collage", "Surreal", "Rococco", "Decoden", "Maximalism", "Minimalism", "Graffiti", "Street"];
const soundtracks = ["Vaporwave", "Blues", "Classical", "Rock", "Funk", "Jazz", "Synthwave", "Hip Hop", "Rap", "Metal", "Country", "Pop", "Ambient", "Punk", "Electronic", "Chiptune", "Choral", "Folk", "Dance", "Drum & Bass", "Dungeon Synth", "Soundtrack", "Lo-Fi", "Techno"];

var adj = ["Aggressive", "Alert", "Ancient", "Anxious", "Attractive", "Average", "Bad", "Beautiful", "Beige", "Big", "Bitter", "Blue", "Bumpy", "Busy", "Careful", "Cheap", "Clear", "Cold", "Combative", "Cotton", "Crooked", "Dangerous", "Delicious", "Dry", "Dull", "Dusty", "Elderly", "Excited", "Expensive", "Fancy", "Fresh", "Fuzzy", "Graceful", "Granite", "Green", "Handsome", "Hollow", "Hot", "Hungry", "Lazy", "Low", "Massive", "Melodic", "Modern", "New", "Oval", "Petite", "Puny", "Purple", "Quiet", "Rainy", "Rich", "Safe", "Shiny", "Soft", "Sore", "Strong", "Superior", "Terrible", "Tiny", "Tired", "Ugly", "Weak", "Weary", "American", "Antarctic", "Atlantic", "Buddhist", "Californian", "Canadian", "Chinese", "Christian", "Cuban", "Ecuadorian", "English", "French", "German", "Greek", "Hindu", "Indonesian", "Italian", "Mayan", "Mexican", "Pacific", "Peruvian", "Roman", "Romanian", "Shakespearean", "Spanish", "Turkish", "Victorian", "Welsh", "Baby-Faced", "Bow-Legged", "Broken-Hearted", "Bull-Headed", "Four-Sided", "Freckle-Faced", "Hard-Hearted", "Hard-Nosed", "Heavy-Handed", "High-Heeled", "Ice-Cold", "Left-Handed", "Life-Giving", "Long-Legged", "Long-Winded", "Next-Door", "Pigeon-Toed", "Quick-Witted", "Red-Blooded", "Self-Centered", "Short-Tempered", "Sure-Footed", "Thin-Skinned", "Tight-Fisted"];
var nouns = ["Boss", "Due", "Genie", "Ingredient", "Jury", "Logo", "Many", "Nod", "Pasture", "Sorrow" , "Analog", "Bootie", "Catamaran", "Dugout", "Ecosystem", "Hold", "Jar", "Ship", "Starboard", "Story" , "Anagram", "Crust", "Enactment", "Journalism", "Knee", "Morning", "Reflection", "Spit", "Vehicle", "Weekend" , "Asterisk", "Bandwidth", "Banner", "Depot", "Disguise", "Gear", "Mattress", "Pitching", "Pompom", "Rice" , "Ability", "Care", "Cartridge", "Employment", "Husband", "Laughter", "Sonar", "Steak", "Tatami", "Taxpayer", "Breadcrumb", "Bricklaying", "Chronicle", "Company", "Decongestant", "Dugout", "Infection", "Mall", "Ordinary", "Waiting", "Chap", "Equinox", "Fishbone", "Fuel", "Giraffe", "Litter", "Mailer", "Pen", "Pressroom", "Sphynx" , "Documentary", "Founder", "Herring", "Muscatel", "Parliament", "Prompt", "Pulley", "Scrap", "Signature", "Wampum", "Airman", "Butter", "Caliber", "Cradle", "Ghost", "Goodbye", "Headquarters", "Incision", "Mariachi", "Skirt", "Abolishment", "Admin", "Appellation", "Blessing", "Easel", "Floozie", "Mind", "Prose", "Swordfish" , "Clockwork", "Combine", "Contrast", "Fugato", "Peak", "Peripheral", "Prestige", "Reactant", "Skunk", "Viewer"]

// This is an array of objects for each palette. They each have a name and 5 colors in hexadecimal format
let paletteCol = [
	{"name": "Melon", "color1": "9db46d", "color2": "b28e8c", "color3": "bf60a3", "color4": "bd929d", "color5": "b5be93"},
	{"name": "Ninja Turtles", "color1": "774f9d", "color2": "69947b", "color3": "31d125", "color4": "7edb24", "color5": "b0e421"},
	{"name": "Baby's Room", "color1": "0b273", "color2": "7cbca0", "color3": "89c6cc", "color4": "b5cbe1", "color5": "dcd0f5"},
	{"name": "LCD", "color1": "7fe141", "color2": "8de75f", "color3": "9bed78", "color4": "659b78", "color5": "374e69"},
	{"name": "Seafoam", "color1": "057cac", "color2": "299cb0", "color3": "45bbb2", "color4": "61dbb2", "color5": "7dfbaf"},
	{"name": "Cactus shop", "color1": "eaefbd", "color2": "c9e3ac", "color3": "90be6d", "color4": "ea9010", "color5": "37371f"},
	{"name": "Wild Blue Yonder", "color1": "fce762", "color2": "fffded", "color3": "ffb17a", "color4": "4f4789", "color5": "201335"},
	{"name": "Sandals and Beaches", "color1": "4281a4", "color2": "48a9a6", "color3": "e4dfda", "color4": "d4b483", "color5": "c1666b"},
	{"name": "Aubergine", "color1": "493548", "color2": "4b4e6d", "color3": "6a8d92", "color4": "80b192", "color5": "a1e887"},
	{"name": "Toy Boat", "color1": "2F4858", "color2": "33658A", "color3": "86BBD8", "color4": "F6AE2D", "color5": "F26419"},
	{"name": "Tulips", "color1": "2e294e", "color2": "efbcd5", "color3": "be97c6", "color4": "8661c1", "color5": "4b5267"},
	{"name": "Arizona", "color1": "ffffff", "color2": "fff8e8", "color3": "fcd581", "color4": "d52941", "color5": "990d35"},
	{"name": "Umbrella weather", "color1": "3e442b", "color2": "6a7062", "color3": "8d909b", "color4": "aaadc4", "color5": "d6eeff"},
	{"name": "Mama's Mumu", "color1": "94b9af", "color2": "90a583", "color3": "9d8420", "color4": "942911", "color5": "593837"},
	{"name": "Lets Go for Drinks", "color1": "403f4c", "color2": "2c2b3c", "color3": "1b2432", "color4": "121420", "color5": "b76d68"},
	{"name": "Beige, beige, BEEEEIGE!", "color1": "050609", "color2": "f5d0c5", "color3": "d69f7e", "color4": "774936", "color5": "3c0000"},
	{"name": "Sugar Sticks", "color1": "fab3a9", "color2": "c6ad94", "color3": "7fb285", "color4": "463239", "color5": "ed6b86"},
	{"name": "Berry Bush", "color1": "07004d", "color2": "2d82b7", "color3": "42e2b8", "color4": "f3dfbf", "color5": "eb8a90"},
	{"name": "Warm Sound", "color1": "713e5a", "color2": "63a375", "color3": "edc79b", "color4": "d57a66", "color5": "ca6680"},
	{"name": "Empty Inside", "color1": "ddd8b8", "color2": "b3cbb9", "color3": "84a9c0", "color4": "6a66a3", "color5": "542e71"},
	{"name": "Eco Fighter", "color1": "134611", "color2": "3e8914", "color3": "3da35d", "color4": "96e072", "color5": "e8fccf"},
	{"name": "Small Star", "color1": "650d1b", "color2": "823200", "color3": "9b3d12", "color4": "ae8e1c", "color5": "c1df1f"},
	{"name": "Antique Lace", "color1": "c6caed", "color2": "ada8be", "color3": "a28497", "color4": "6f5e5c", "color5": "4a5240"},
	{"name": "Snacks in the Foyer", "color1": "e1b07e", "color2": "e5be9e", "color3": "cbc0ad", "color4": "86a397", "color5": "361d2e"},
	{"name": "To Excess", "color1": "9e0031", "color2": "8e0045", "color3": "770058", "color4": "600047", "color5": "44001a"},
	{"name": "Quiet", "color1": "9e0031", "color2": "8e0045", "color3": "770058", "color4": "600047", "color5": "44001a"},
	{"name": "With Feeling", "color1": "08090a", "color2": "a7a2a9", "color3": "f4f7f5", "color4": "575a5e", "color5": "222823"},
	{"name": "Muted Enthusiasm", "color1": "2b2d42", "color2": "8d99ae", "color3": "edf2f4", "color4": "ef233c", "color5": "d80032"},
	{"name": "Burlap Accent", "color1": "eecf6d", "color2": "d5ac4e", "color3": "8b6220", "color4": "720e07", "color5": "45050c"},
	{"name": "Oh, that's puce", "color1": "c6878f", "color2": "b79d94", "color3": "969696", "color4": "67697c", "color5": "253d5b"},
	{"name": "Sunny's Cleaners", "color1": "545863", "color2": "00e8fc", "color3": "f96e46", "color4": "f9c846", "color5": "ffe3e3"},
	{"name": "Afternoon Breeze", "color1": "156064", "color2": "00c49a", "color3": "f8e16c", "color4": "ffc2b4", "color5": "fb8f67"},
	{"name": "Fresh Laundry", "color1": "616163", "color2": "44ffd2", "color3": "87f6ff", "color4": "daf5ff", "color5": "ffbfa0"},
	{"name": "Powerpuff", "color1": "E9E2E4", "color2": "DD9769", "color3": "D93B78", "color4": "130C15", "color5": "088A8B"},
	{"name": "Boy Stuff", "color1": "1C0C1C", "color2": "623C1C", "color3": "1B6F64", "color4": "086067", "color5": "8E8069"},
	{"name": "Nice Sweater", "color1": "EF2F1B", "color2": "E7A85D", "color3": "87623E", "color4": "294426", "color5": "152340"}
];

// This is the code for the prompt tools app. It must be loaded after jquery and jquery ui because it depends on both of them.
$(document).ready( function() {
	$("#prompts #prompts-generate").click(function() {
		var cat = pickPrompt(categories);
		var style = pickPrompt(styles);
		var music = pickPrompt(soundtracks);
		var colors = pickPrompt(paletteCol);
		var phrase = pickPrompt(adj) + " " + pickPrompt(nouns);

		$("#prompts #prompts-style .result").html(style);
		$("#prompts #prompts-category .result").html(cat);
		$("#prompts #prompts-soundtrack .result").html(music);
		$("#prompts #prompts-words .result").html(phrase);

		$("#prompts #prompts-palette #prompts1").css("background-color", "#" + colors.color1);
		$("#prompts #prompts-palette #prompts2").css("background-color", "#" + colors.color2);
		$("#prompts #prompts-palette #prompts3").css("background-color", "#" + colors.color3);
		$("#prompts #prompts-palette #prompts4").css("background-color", "#" + colors.color4);
		$("#prompts #prompts-palette #prompts5").css("background-color", "#" + colors.color5);
		$("#prompts #prompts-colors-text").html("<b>" + colors.name + "</b> #" + colors.color1 + ", #" + colors.color2 + ", #" + colors.color3 + ", #" + colors.color4 + ", #" + colors.color5);
	});
});

function pickPrompt(arr){
	var size = arr.length;
	var num = Math.floor(Math.random() * size);

	return(arr[num]);
};