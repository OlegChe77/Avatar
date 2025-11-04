export const AVATAR_STYLES = {
  simpsons: {
    name: 'Симпсоны',
    prompt: "Generate an avatar from the provided photo in the iconic art style of 'The Simpsons'. Ensure the key facial features of the person are preserved and clearly recognizable. Place the character in a setting from the show, like Moe's Tavern or the Simpson's living room, and dress them in appropriate attire for that universe.",
  },
  southPark: {
    name: 'Южный Парк',
    prompt: "Recreate this person as a character from 'South Park'. Use the show's distinct, simple, construction-paper cutout style, but make sure the face remains identifiable. Put them in a snowy South Park scene, wearing the show's typical winter clothing like a parka or hat.",
  },
  spongebob: {
    name: 'Губка Боб',
    prompt: "Recreate this person as a character from 'SpongeBob SquarePants'. Capture the show's vibrant, underwater art style, but ensure the person's key facial features are recognizable. Place them in an underwater setting like Bikini Bottom and give them an appropriate aquatic-themed body or outfit.",
  },
  futurama: {
    name: 'Футурама',
    prompt: "Transform this person into a character in the retro-futuristic animation style of 'Futurama'. Maintain the show's distinct character design while keeping the person's face identifiable. Dress them in futuristic clothing and place them in a setting like New New York or on the Planet Express ship.",
  },
  marvel: {
    name: 'Антигерой Marvel',
    prompt: "Redraw this person as a gritty Marvel anti-hero, in a dark comic book art style. The expression and core facial structure should be recognizable, but with a darker, more intense aesthetic. Give them a suitable costume and a dramatic, action-packed background fitting for a comic book panel.",
  },
  anime: {
    name: 'В стиле Аниме',
    prompt: "Generate an avatar based on this photo in the beautiful, hand-drawn art style of a popular modern anime. The character should look like they belong in an anime series, but with the same recognizable face as the photo. Design a dynamic pose and outfit for them, placing them in a typical anime scene like a bustling city street or a serene natural landscape.",
  },
  rickAndMorty: {
    name: 'Рик и Морти',
    prompt: "Illustrate this person in the eccentric, slightly grotesque art style of 'Rick and Morty'. Give them the characteristic wobbly pupils and make sure their core facial features are still recognizable in that universe. Place them on an alien planet or in Rick's garage, and give them a sci-fi outfit or bizarre body modification."
  },
  ghibli: {
    name: 'Студия Ghibli',
    prompt: "Reimagine the person in this photo as a character from a Studio Ghibli film. Capture the gentle, painterly aesthetic and emotional depth characteristic of the style, while preserving the person's likeness. Place them in a lush, natural Ghibli-esque landscape and dress them in simple, classic clothing."
  },
  bobsBurgers: {
    name: "Закусочная Боба",
    prompt: "Redraw this person in the unique and slightly awkward art style of 'Bob's Burgers'. Maintain their recognizable facial features but adapt them to the show's signature character design with muted colors. Place them inside the Bob's Burgers restaurant, perhaps as a customer or employee, with an appropriate outfit."
  },
  adventureTime: {
    name: 'Время Приключений',
    prompt: "Transform the person in the photo into a character from 'Adventure Time'. Use the show's signature simple, colorful, and whimsical art style with noodle-like limbs and expressive, dot-like eyes, while ensuring the person's core likeness is maintained. Give them a whimsical body and place them in the colorful Land of Ooo."
  },
  cyberpunk: {
    name: 'Киберпанк Арт',
    prompt: "Redraw this person as a character in a gritty, neon-drenched cyberpunk world. The style should be futuristic and edgy, with potential cybernetic enhancements, reflective surfaces, and dramatic lighting, while preserving the key facial features of the original person. Integrate cybernetic elements into their body and place them in a futuristic cityscape."
  }
} as const;

export type AvatarStyleKey = keyof typeof AVATAR_STYLES;