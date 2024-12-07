import React, { useEffect, useState, Suspense } from "react";
import("./Dynamite")

const App = () => {
  const LazyComponent = React.lazy(() => import(/* webpackChunkName: "chunk1" */'./Dynamite'));
  const LazyComponent2 = React.lazy(() => import(/* webpackChunkName: "chunk1" */'./Dynamite2'));
  const LazyComponent3 = React.lazy(() => import(/* webpackChunkName: "chunk1" */'./Dynamite2'));

  // const [D, setD] = useState(null);
  //
  // useEffect(() => {
  //   import("./Dynamite").then(res => {
  //     const D = res.default;
  //     console.log(D);
  //     setD(D);
  //   });
  // }, []);

  return (
    <div>
      lalala
      {/*{D && <D />}*/}
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
        <LazyComponent2 />
        <LazyComponent3 />
      </Suspense>
    </div>
  );
};


export default App;


