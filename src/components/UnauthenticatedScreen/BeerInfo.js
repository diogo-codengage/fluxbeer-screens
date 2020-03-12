import React, { memo } from "react";

import { useMainContext } from "../Context";

export const BeerInfo = memo(
  ({ icon, iconWidth = "w-20", title, description }) => {
    const { styles } = useMainContext();

    return (
      <div className="flex mb-7">
        <div className="w-10 flex justify-center mr-6">
          <img
            className={iconWidth}
            src={icon}
            alt={title}
            style={{ maxWidth: "none" }}
          />
        </div>

        <div className="flex flex-1 flex-col justify-center">
          <div
            className="font-medium text-lg uppercase"
            style={styles.textSecondary}
          >
            {title}
          </div>
          {description && (
            <div
              className="font-light text-lg leading-none mt-1 w-3/4"
              style={styles.textSecondary}
            >
              {description}
            </div>
          )}
        </div>
      </div>
    );
  }
);
