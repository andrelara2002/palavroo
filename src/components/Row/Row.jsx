import React from "react";

import Letter from "../Letter/Letter";

import './style.css'

import { v4 as uuidv4 } from 'uuid';

export default function LetterRow({ characters, enabled }) {

    return (
        <div className="grid grid-flow-col auto-cols-max gap-2 mb-2">
            {characters.map((character, c_index) =>
                <Letter key={uuidv4()} character={character} enabled={enabled} />
            )}
        </div>
    );
}
