import {getUserProfile} from 'api-ai-webhook-utils';
import resolvedQueryContains from '../utils/string-contains';
import getGiphyUrl from '../utils/giphy-url';

export default function getResponses() {
    const userProfile = getUserProfile();

    return {
        welcome: () => {
            return [
                { text: `Hey ${userProfile.firstNameWithSpace}- so I’ve been staring at your profile pic…` },
                {
                    list: {
                        facebookTopElementStyle: 'compact',
                        options: [
                            {
                                title: 'Classic White T-Shirt',
                                subTitle: 'See all our colors',
                                imageUrl: 'https://images.fineartamerica.com/images-medium-large/scenic-view-in-canadian-rockies-elena-elisseeva.jpg',
                                button: {
                                    title: 'View',
                                    url: 'https://petersapparel.parseapp.com/view_item?item_id=100',
                                    facebookWebviewHeight: 'tall'
                                }
                            },
                            {
                                title: 'Classic White T-Shirt 2',
                                subTitle: 'See all our colors',
                                imageUrl: 'https://images.fineartamerica.com/images-medium-large/scenic-view-in-canadian-rockies-elena-elisseeva.jpg',
                                button: {
                                    title: 'View',
                                    action: 'foo',
                                    facebookWebviewHeight: 'compact'
                                }
                            }
                        ],
                        standaloneButton: {
                            title: 'Some title',
                            url: 'http://google.com'
                        }
                    }
                },
                { simpleResponses: ['And?', 'Uhh… Okay…'] }
            ];
            // return [
            //     { text: `Hey ${userProfile.firstNameWithSpace}- so I’ve been staring at your profile pic…` },
            //     { simpleResponses: ['And?', 'Uhh… Okay…'] }
            // ];
        },
        sexy: () => {
            return [{text: 'You’re sexy!'}, {imageUrl: userProfile.profilePic, accessibilityText: 'Your user profile image.'}, {simpleResponses: ['You’re a creep.', 'You’re a weirdo.']}];
        }
        // template: () => {
        //     return [
        //         { text: 'Lorem' },
        //         { text: 'Ipsum' },
        //         { simpleResponses: ['One', 'Two'] }
        //     ];
        // }
    };
}
