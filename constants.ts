export const AVATAR_STYLES = {
  simpsons: {
    name: 'The Simpsons',
    prompt: "Generate an avatar from the provided photo in the iconic art style of 'The Simpsons'. Ensure the key facial features of the person are preserved and clearly recognizable.",
  },
  southPark: {
    name: 'South Park',
    prompt: "Recreate this person as a character from 'South Park'. Use the show's distinct, simple, construction-paper cutout style, but make sure the face remains identifiable.",
  },
  spongebob: {
    name: 'SpongeBob SquarePants',
    prompt: "Recreate this person as a character from 'SpongeBob SquarePants'. Capture the show's vibrant, underwater art style, but ensure the person's key facial features are recognizable.",
  },
  futurama: {
    name: 'Futurama',
    prompt: "Transform this person into a character in the retro-futuristic animation style of 'Futurama'. Maintain the show's distinct character design while keeping the person's face identifiable.",
  },
  marvel: {
    name: 'Marvel Anti-Hero',
    prompt: "Redraw this person as a gritty Marvel anti-hero, in a dark comic book art style. The expression and core facial structure should be recognizable, but with a darker, more intense aesthetic.",
  },
  anime: {
    name: 'Anime Style',
    prompt: "Generate an avatar based on this photo in the beautiful, hand-drawn art style of a popular modern anime. The character should look like they belong in an anime series, but with the same recognizable face as the photo.",
  },
  pixar: {
    name: '3D Pixar Style',
    prompt: "Turn this person into a 3D character from a Pixar movie. The avatar should have the characteristic soft lighting, detailed textures, and expressive features of Pixar animation, while maintaining a strong resemblance to the original person.",
  },
  rickAndMorty: {
    name: 'Rick and Morty',
    prompt: "Illustrate this person in the eccentric, slightly grotesque art style of 'Rick and Morty'. Give them the characteristic wobbly pupils and make sure their core facial features are still recognizable in that universe."
  },
  ghibli: {
    name: 'Studio Ghibli',
    prompt: "Reimagine the person in this photo as a character from a Studio Ghibli film. Capture the gentle, painterly aesthetic and emotional depth characteristic of the style, while preserving the person's likeness."
  },
  bobsBurgers: {
    name: "Bob's Burgers",
    prompt: "Redraw this person in the unique and slightly awkward art style of 'Bob's Burgers'. Maintain their recognizable facial features but adapt them to the show's signature character design with muted colors."
  },
} as const;

export type AvatarStyleKey = keyof typeof AVATAR_STYLES;