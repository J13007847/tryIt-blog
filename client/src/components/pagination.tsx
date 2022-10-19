import { useState } from "react";
import { Pagination } from "@mui/material";
export default function PageCom({
  listEvent,
  total,
  pageData = { cursor: 1, limit: 10 },
}: {
  listEvent: Function;
  total: number;
  pageData?: any;
}) {
  const [cursor, setCursor] = useState(pageData.cursor);
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCursor(value);
    listEvent(value);
  };
  return (
    <div>
      <Pagination
        count={Math.ceil((total || 0) / pageData.limit)}
        page={cursor}
        onChange={handleChange}
      />
    </div>
  );
}
