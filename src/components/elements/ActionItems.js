import {StyledFavouriteButton} from "../styles/StyledFavoriteButton";
import {StyledDetailedLink} from "../styles/StyledDetailedLink";
import React from "react";

export const ActionItems = ({removeFromFavoriteBooks, addToFavoriteBooks, detailedViewUrl, isFavorite}) =>
    <div style={{width: "190px", height: "120px"}}>
        {isFavorite ? (
            <StyledFavouriteButton onClick={removeFromFavoriteBooks}>Remove favourite</StyledFavouriteButton>
        ) : (
            <StyledFavouriteButton onClick={addToFavoriteBooks}>Add favourite</StyledFavouriteButton>
        )}
        <br/>
        <StyledDetailedLink to={detailedViewUrl}>More information</StyledDetailedLink>
    </div>