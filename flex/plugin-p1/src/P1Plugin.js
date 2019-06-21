import { FlexPlugin } from 'flex-plugin';
import React from 'react';
import CustomTaskListComponent from './components/CustomTaskListComponent';
import customThemeOverrides from './customThemeOverrides';

const PLUGIN_NAME = 'P1Plugin';

export default class P1Plugin extends FlexPlugin {
    constructor() {
        super(PLUGIN_NAME);
    }

    /**
     * This code is run when your plugin is being started
     * Use this to modify any UI components or attach to the actions framework
     *
     * @param flex { typeof import('@twilio/flex-ui') }
     * @param manager { import('@twilio/flex-ui').Manager }
     */
    init(flex, manager) {

        const twilioBlue = '#954C08'; //"#0D122B";
        const twilioRed = "#F22F46";
        const white = "#ffffff";
        const lightGray = "#e6e6e6";
        const darkGray = "#666666";

        manager.updateConfig({
            colorTheme: {
                baseName: "GreyDark",
                colors: {
                    darkTextColor: "#e0e0e0",
                },
                overrides: customThemeOverrides
            }
        });

        flex.MainHeader.defaultProps.logoUrl = "http://tigerfarmpress.com/images/topImgLeft.jpg";

        flex.CRMContainer.defaultProps.uriCallback = (task) => {
            return task ? "https://owlcrm.herokuapp.com/profile?id=" + task.attributes.account_number : "https://owlcrm.herokuapp.com";
        }

        flex.AgentDesktopView.Panel1.Content.add(
                <CustomTaskListComponent key="demo-component" />,
                {
                    sortOrder: -1,
                }
        );

    }

}
