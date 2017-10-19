// import {getUserProfile} from 'common-chatbot-ui';
// import stringContains from '../utils/string-contains';
// import getGiphyUrl from '../utils/giphy-url';

const imageUrlBase = 'https://ianrichard.github.io/common-chatbot-ui-starter-project/media/demo/';

export default {
    welcome: () => {
        return [
            {
                type: 'text',
                message: 'Hey there! This is a guided tour of common components between Facebook Messenger and Google Assistant.'
            },
            {
                type: 'text',
                message: 'You can start coding the sample project at github.com/ianrichard.'
            },
            {
                type: 'simple-responses',
                values: ['Show me demos!', 'Show code & docs']
            }
        ];
    },
    codeLink: () => {
        return [
            {
                type: 'text',
                message: 'Sure - Here it is.'
            },
            {
                type: 'card',
                title: 'Common Chatbot UI Starter',
                subTitle: 'A Project by Ian Richard',
                image: {
                    url: `${imageUrlBase}github.jpg`,
                    accessibilityText: 'Github logo.'
                },
                button: {
                    title: 'Visit Site',
                    facebookWebviewHeight: 'tall', // compact, tall or full
                    url: 'https://github.com/ianrichard/common-chatbot-ui-starter-project'
                }
            },
            {
                type: 'simple-responses',
                values: ['Show me demos!']
            }
        ];
    },
    imageExample: () => {
        return [
            {
                type: 'text',
                message: 'Animated GIFs are always fun to add to the mix!'
            },
            {
                type: 'image',
                url: `${imageUrlBase}colbert.gif`,
                accessibilityText: 'Stephen Colbert at the beginning of the show being happy.'
            },
            {
                type: 'simple-responses',
                values: ['What about a card?']
            }
        ];
    },
    cardExample: () => {
        return [
            {
                type: 'text',
                message: 'Absolutely!'
            },
            {
                type: 'text',
                message: 'Named for a winding stretch of Hill Country highway, Devil’s Backbone is a Belgian-style tripel. Featuring a beautiful pale-golden color, this ale’s spicy hops and Belgian yeast work together to create a distinctive flavor and aroma. Don’t let the light color fool you, this one has a dark side too. Traditional Belgian brewing techniques add strength without increasing heaviness.'
            },
            {
                type: 'card',
                title: 'Devil’s Backbone',
                subTitle: 'Belgian-Style Tripel',
                image: {
                    url: `${imageUrlBase}devils-backbone.jpg`,
                    accessibilityText: 'Ice cold beer.'
                },
                button: {
                    title: 'Read More',
                    facebookWebviewHeight: 'tall', // compact, tall or full
                    url: 'https://realalebrewing.com/beers/devils-backbone/'
                }
            },
            {
                type: 'simple-responses',
                values: ['How about a list?']
            }
        ];
    },
    listExample: () => {
        return [
            {
                type: 'text',
                message: 'Absolutely!'
            },
            {
                type: 'text',
                message: 'Who’s your favorite GOT character!?'
            },
            {
                type: 'list',
                facebookTopElementStyle: 'compact',
                options: [
                    {
                        title: 'Tyrion Lannister',
                        key: 'tyrion',
                        subTitle: 'Peter Dinklage',
                        imageUrl: `${imageUrlBase}got-tyrion.jpg`
                    },
                    {
                        title: 'Daenerys Targaryen',
                        key: 'daene',
                        subTitle: 'Emilia Clarke',
                        imageUrl: `${imageUrlBase}got-daenerys.jpg`
                    },
                    {
                        title: 'Jon Snow',
                        key: 'jon',
                        subTitle: 'Kit Harington',
                        imageUrl: `${imageUrlBase}got-jon.jpg`
                    }
                ]
            },
            {
                type: 'config',
                outputContext: 'carouselExample'
            }
        ];
    },
    carouselExample: (config) => {

        let dynamicResponseText = 'What!? None of them?';

        const gotCharacter = config.parameters.selectedOption;

        if (gotCharacter === 'tyrion') {
            dynamicResponseText = 'I drink and I know things!';
        } else if (gotCharacter === 'daene') {
            dynamicResponseText = 'Fire!';
        } else if (gotCharacter === 'jon') {
            dynamicResponseText = 'King of the north!';
        }

        return [
            {
                type: 'text',
                message: dynamicResponseText
            },
            {
                type: 'text',
                message: 'What are you going to buy your wife from Tiffany?'
            },
            {
                type: 'carousel',
                options: [
                    {
                        title: 'Aviator Sunglasses',
                        key: 'sunglasses',
                        subTitle: '$360',
                        imageUrl: `${imageUrlBase}tiffany-glasses.jpg`
                    },
                    {
                        title: 'Infinity Ring',
                        key: 'ring',
                        subTitle: '$200',
                        imageUrl: `${imageUrlBase}tiffany-ring.jpg`
                    },
                    {
                        title: 'Soleste Earrings',
                        key: 'earrings',
                        subTitle: '$5,600',
                        imageUrl: `${imageUrlBase}tiffany-earrings.jpg`
                    },
                    {
                        title: 'Infinity Pendant',
                        key: 'pendant',
                        subTitle: '$250',
                        imageUrl: `${imageUrlBase}tiffany-necklace.jpg`
                    },
                    {
                        title: 'East West Mini',
                        key: 'watch',
                        subTitle: '$7,500',
                        imageUrl: `${imageUrlBase}tiffany-watch.jpg`
                    }
                ]
            },
            {
                type: 'config',
                outputContext: 'outro'
            }
        ];
    },
    outro: (config) => {
        
        let dynamicResponseText = 'The end';

        const tiffanyItem = config.parameters.selectedOption;

        if (tiffanyItem === 'sunglasses') {
            dynamicResponseText = 'She’ll look cool in those shades!';
        } else if (tiffanyItem === 'ring') {
            dynamicResponseText = 'She’ll love you forever and keep men away with that ring!';
        } else if (tiffanyItem === 'earrings') {
            dynamicResponseText = 'Bling bling!  Her girlfriends will be jealous with those bright-colored earrings!';
        } else if (tiffanyItem === 'pendant') {
            dynamicResponseText = 'Your infinite love will always be close to her heart!';
        } else if (tiffanyItem === 'watch') {
            dynamicResponseText = 'You’d better be on time from here on out!';
        }

        return [
            {
                type: 'text',
                message: dynamicResponseText
            },
            {
                type: 'text',
                message: 'Well, that’s the end of the demo.  Hope you enjoyed!'
            },
            {
                type: 'simple-responses',
                values: ['Start over']
            }
        ];
    }
};