import React, { useState } from 'react';

export const AdvancedSearch = ({ title, children }) => {
    const [isOpened, setIsOpened] = useState(false);

    function search() {
        setIsOpened(wasOpened => !wasOpened);
    }

    return (
        <div>
            <div onClick={search}>
                {title}
            </div>
            {isOpened && (
                <div className="boxContent">
                    {children}
                </div>
            )}
        </div>
    );
}