import {getUserProfile} from 'api-ai-webhook-utils';
import resolvedQueryContains from '../utils/string-contains';
import getGiphyUrl from '../utils/giphy-url';

export default function getResponses() {

    const userProfile = getUserProfile();

    return {
        welcome: () => {
            return [
                { text: `Heyo ${userProfile.firstNameWithSpace}- so I’ve been staring at your profile pic…` },
                { simpleResponses: ['And?', 'Uhh… Okay…'] }
            ];
        },
        sexy: () => {
            return [
                { text: 'You’re sexy!' },
                { image: userProfile.profilePic, accessibilityText: 'Your user profile image.' },
                { simpleResponses: ['You’re a creep.', 'You’re a weirdo.'] }
            ]
        }
        // template: () => {
        //     return [
        //         { text: 'Lorem' },
        //         { text: 'Ipsum' },
        //         { simpleResponses: ['One', 'Two'] }
        //     ];
        // }
    }
}