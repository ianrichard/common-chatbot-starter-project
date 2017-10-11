import {getUserProfile} from 'api-ai-webhook-utils';
import resolvedQueryContains from '../utils/string-contains';
import getGiphyUrl from '../utils/giphy-url';

export default function getResponses() {
    const userProfile = getUserProfile();

    return {
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
                    values: ['Sweet!', 'Show me stuff!']
                }
            ]
        },
        imageExample: () => {
            return [
                {
                    type: 'text',
                    message: 'Animated GIFs are always fun to add to the mix!'
                },
                {
                    type: 'image',
                    url: 'https://media.giphy.com/media/EyJss95ft0ali/giphy.gif',
                    accessibilityText: 'Stephen Colbert at the beginning of the show being happy.'
                },
                {
                    type: 'simple-responses',
                    values: ['What about a card?']
                }
            ]
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
                        url: 'https://realalebrewing.com/wp-content/uploads/2015/01/Devils-Backbone-bottle-and-can-web-photography-final-700x550.png',
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
                            title: 'Peter Dinklage',
                            subTitle: 'Tyrion Lannister',
                            imageUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTM1MTI5Mzc0MF5BMl5BanBnXkFtZTYwNzgzOTQz._V1_UY317_CR20,0,214,317_AL_.jpg',
                            facebookButtonTitle: 'Select'
                        },
                        {
                            title: 'Emilia Clarke',
                            subTitle: 'Daenerys Targaryen',
                            imageUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNjg3OTg4MDczMl5BMl5BanBnXkFtZTgwODc0NzUwNjE@._V1_UX214_CR0,0,214,317_AL_.jpg',
                            facebookButtonTitle: 'Select'
                        },
                        {
                            title: 'Kit Harington',
                            subTitle: 'Jon Snow',
                            imageUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTA2NTI0NjYxMTBeQTJeQWpwZ15BbWU3MDIxMjgyNzY@._V1_UX214_CR0,0,214,317_AL_.jpg',
                            facebookButtonTitle: 'Select'
                        }
                    ]
                },
                {
                    type: 'simple-responses',
                    values: ['A carousel?']
                }
            ]
        },
        carouselExample: () => {
            return [
                {
                    type: 'text',
                    message: 'Who’s your least favorite GOT character?'
                },
                {
                    type: 'carousel',
                    options: [
                        {
                            title: 'Peter Dinklage',
                            subTitle: 'Tyrion Lannister',
                            imageUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTM1MTI5Mzc0MF5BMl5BanBnXkFtZTYwNzgzOTQz._V1_UY317_CR20,0,214,317_AL_.jpg',
                            facebookButtonTitle: 'Select'
                        },
                        {
                            title: 'Emilia Clarke',
                            subTitle: 'Daenerys Targaryen',
                            imageUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNjg3OTg4MDczMl5BMl5BanBnXkFtZTgwODc0NzUwNjE@._V1_UX214_CR0,0,214,317_AL_.jpg',
                            facebookButtonTitle: 'Select'
                        },
                        {
                            title: 'Kit Harington',
                            subTitle: 'Jon Snow',
                            imageUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTA2NTI0NjYxMTBeQTJeQWpwZ15BbWU3MDIxMjgyNzY@._V1_UX214_CR0,0,214,317_AL_.jpg',
                            facebookButtonTitle: 'Select'
                        },
                        {
                            title: 'Kristian Nairn',
                            subTitle: 'Hodor',
                            imageUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTkwMzI5MzE5MV5BMl5BanBnXkFtZTcwMTkzOTc3OQ@@._V1_UY317_CR20,0,214,317_AL_.jpg',
                            facebookButtonTitle: 'Select'
                        }
                    ]
                }
            ]
        }
    };
}
