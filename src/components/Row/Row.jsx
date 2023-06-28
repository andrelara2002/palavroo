import React from "react";

import Letter from "../Letter/Letter";

import './style.css'

export default function Row({ characters, enabled }) {

    console.log(characters)
    return <div className="row">{characters.map((character, index) => Letter({ character, index, enabled: true }))}</div>
}
