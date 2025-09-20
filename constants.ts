import { Language, LanguageOption, Product } from './types';

export const APP_NAME = 'VAANI';

export const LANGUAGES: LanguageOption[] = [
  { code: Language.ENGLISH, name: 'English' },
  { code: Language.HINDI, name: 'हिन्दी' },
  { code: Language.TAMIL, name: 'தமிழ்' },
  { code: Language.TELUGU, name: 'తెలుగు' },
  { code: Language.MALAYALAM, name: 'മലയാളം' },
];

export const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Hand-Painted Clay Vase',
        description: 'A beautiful vase painted with traditional motifs. Perfect for home decor.',
        imageUrl: 'https://picsum.photos/seed/product1/400/400',
        qrCodeUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQAQMAAADdiHD7AAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAIJJREFUOMtjYKAgs2Foc8FmYxATE4zBDChmMDZmDAZ7MHyw2TAlYwPDdoAlhpsdGFYyLLCZx2CW4WYHZjYMdhhueDAwYGKG4wYDvQYMPiwwuGAww3JgYFCYYYyBwWBgYAYEc2CwYfKYwcBgYPgv0dhiMnAwGExgYDBZyGZghs0fAAAuBFLg+o1YbwAAAABJRU5ErkJggg==',
    },
    {
        id: '2',
        name: 'Woven Bamboo Basket',
        description: 'Eco-friendly and durable basket, handwoven by skilled artisans.',
        imageUrl: 'https://picsum.photos/seed/product2/400/400',
        qrCodeUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQAQMAAADdiHD7AAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAIJJREFUOMtjYKAgs2Foc8FmYxATE4zBDChmMDZmDAZ7MHyw2TAlYwPDdoAlhpsdGFYyLLCZx2CW4WYHZjYMdhhueDAwYGKG4wYDvQYMPiwwuGAww3JgYFCYYYyBwWBgYAYEc2CwYfKYwcBgYPgv0dhiMnAwGExgYDBZyGZghs0fAAAuBFLg+o1YbwAAAABJRU5ErkJggg==',
    },
    {
        id: '3',
        name: 'Printed Cotton Scarf',
        description: 'A soft cotton scarf featuring unique block-printed designs.',
        imageUrl: 'https://picsum.photos/seed/product3/400/400',
        qrCodeUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQAQMAAADdiHD7AAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAIJJREFUOMtjYKAgs2Foc8FmYxATE4zBDChmMDZmDAZ7MHyw2TAlYwPDdoAlhpsdGFYyLLCZx2CW4WYHZjYMdhhueDAwYGKG4wYDvQYMPiwwuGAww3JgYFCYYYyBwWBgYAYEc2CwYfKYwcBgYPgv0dhiMnAwGExgYDBZyGZghs0fAAAuBFLg+o1YbwAAAABJRU5ErkJggg==',
    }
];