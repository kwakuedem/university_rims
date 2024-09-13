import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Email, Item, Text } from "@inertiajs/inertia-react";

function SendEmail({ message }) {
    return (
        <Email>
            <Item>
                <Text>
                    <h1>Message from ROS HTU</h1>
                    <p>{message}</p>
                </Text>
            </Item>
        </Email>
    );
}

export default SendEmail;
