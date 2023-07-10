import React from "react";

import Letter from "../Letter/Letter";

import './style.css'

import { v4 as uuidv4 } from 'uuid';

export default function LetterRow({ characters, enabled, onClickCharacter, selected_key }) {

    return (
        <div className="grid grid-flow-col auto-cols-max gap-2 mb-2">
            {characters.map((character, c_index) =>
                <Letter
                    onClick={enabled ? onClickCharacter : undefined}
                    index={c_index}
                    key={uuidv4()}
                    character={character} enabled={enabled}
                    selected={selected_key === c_index} />
            )}
        </div>
    );
}
