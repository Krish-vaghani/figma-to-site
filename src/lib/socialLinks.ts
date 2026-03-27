// Centralized social media links configuration
export const SOCIAL_LINKS = {
    instagram: "https://www.instagram.com/pursolina?igsh=MXFrdzNodDN3ejQyeg==",
    facebook: "https://www.facebook.com/pursolina",
    twitter: "https://twitter.com/pursolina",
    email: "help.pursolina@gmail.com",
    phone: "+91 8320574887",
} as const;

// For schema.org markup
export const SOCIAL_SCHEMA = [
    SOCIAL_LINKS.facebook,
    SOCIAL_LINKS.instagram,
    SOCIAL_LINKS.twitter,
] as const;
