import React, { useEffect, useState } from "react";
import "./App.css";
import { items } from "./config";
import { cx } from "@emotion/css";

function App() {
  const [colorDecolorItems, setColorDecolorItems] = useState(items);
  const [colorDecolorItemsQueue, setColorDecolorItemsQueue] = useState([]);

  const onItemClick = (item_id) => {
    setColorDecolorItemsQueue((queue) => [...queue, item_id]);
    setColorDecolorItems(
      colorDecolorItems.map((item) =>
        item.id === item_id ? { ...item, clicked: true } : item
      )
    );
  };

  useEffect(() => {
    let copyQueue = [...colorDecolorItemsQueue];
    let c = 0;
    if (colorDecolorItemsQueue.length === 7) {
      for (let i = 0; i < 7; i++) {
        const currentItemToBeDecoloredId = copyQueue.shift();
        c++;
        setTimeout(() => {
          setColorDecolorItems((colorDecolorItems) => {
            return colorDecolorItems.map((item) =>
              item.id === currentItemToBeDecoloredId
                ? { ...item, clicked: false }
                : item
            );
          });
        }, i * 1000);
      }
      if (c === 7) {
        setColorDecolorItemsQueue([]);
      }
    }
  }, [colorDecolorItemsQueue]);

  return (
    <div className="color-decolor">
      Coloring decoloring
      <div className="container">
        {colorDecolorItems.map((item) => {
          return item.visible ? (
            <div
              className={cx("grid-items", { ["clickedItems"]: item.clicked })}
              key={item.id}
              onClick={() => onItemClick(item.id)}
            >
              {item.id}
            </div>
          ) : (
            <div key={item.id}></div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
