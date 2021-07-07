import { useTranslation } from "react-i18next";

import { isEmptyObject } from "../utilities/utils";

const useCountRooms = (rooms) => {
  const { t } = useTranslation();
  
  let roomsList = [];
  if (!isEmptyObject(rooms)) {
    for (let el in rooms) {
      const elCount = rooms[el];
      let room = el;
      if (elCount > 1) {
        room = `${elCount}x ${el}`;
      }

      elCount > 0 && roomsList.push(room);
    }

    roomsList = roomsList.join(', ');
  }

  return roomsList.length > 0 && roomsList;
}

export default useCountRooms;
