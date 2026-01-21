import { Outlet } from "react-router-dom";

export function TheList() {
  return (
    <>
      <div className="theOutlet">
        <Outlet />
      </div>
    </>
  );
}
