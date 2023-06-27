import React from "react";

import Letter from "../Letter/Letter";

export default function Row(characters, enabled) {
    return <div>{characters.map(letter => Letter(enabled, characters))}</div>
}