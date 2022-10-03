import React from "react";

function Aside(): JSX.Element {
  return (
    <aside className="w-4/12 bg-slate-100 drop-shadow-lg">
      <div className="mx-5 my-2">
        <div>
          <span>Recipients</span>
        </div>
        <div>
          <ul>
            <li>1. Hat</li>
            <li>2. Top</li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
