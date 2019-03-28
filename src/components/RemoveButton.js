import React, { Component, useState, useEffect } from 'react'

const RemoveButton = ({ remove, id }) => {
    const [removeFlag, setRemoveFlag] = useState(false);

    useEffect(() => {
        setRemoveFlag(false);
    }, [id]);

    if (!removeFlag) {
        return (
            <button
                type="button"
                className="danger"
                onClick={() => setRemoveFlag(true)}
            >
                Remove Me !!!!!
                </button>
        );
    } else {
        return (
            <div>
                <button
                    type="button"
                    onClick={() => setRemoveFlag(false)}
                >
                    Nevermind, Don't Remove
                    </button>

                <button
                    type="button"
                    onClick={() => remove()}
                >
                    Yes, Remove Me
                    </button>
            </div>
        );
    }
}

export default RemoveButton;