import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

const routes = [
  "/",
  "/counter",
  "/form",
  "/store",
  "/theme-changer",
  "/toggler"
]



export function RouteCarousel() {
  const location = useLocation();
  const navigate = useNavigate();



  const currentIndex = routes.indexOf(location.pathname);

  function goNext() {
    if (currentIndex < routes.length - 1) {
      navigate(routes[currentIndex + 1]);
    }
  }

  function goPrev() {
    if (currentIndex > 0) {
      navigate(routes[currentIndex - 1]);
    }
  }

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col">
          <Outlet />
        </div>
        
      </div>

      <div className="row">

        <div className="col">
          <button className="btn btn-primary" onClick={goPrev} disabled={currentIndex === 0}>
            Prev
          </button>
        </div>

        <div className="col">
          <button className="btn btn-primary" onClick={goNext} disabled={currentIndex === routes.length - 1}>
            Next
          </button>
        </div>

      </div>


      

      
      

      
    </div>
  );
}

export default function Root() {
  return (
    // <>
    //   <div id="sidebar">
    //     <h1>Carousel</h1>
        
    //     <nav>
    //       <ul>
    //         <li>
    //           <Link to={`/counter`}>Counter</Link>
    //         </li>
    //         <li>
    //           <a href={`/form`}>Form</a>
    //         </li>
    //         <li>
    //           <a href={`/store`}>Store</a>
    //         </li>
    //         <li>
    //           <a href={`theme-changer`}>Theme Changer</a>
    //         </li>
    //         <li>
    //           <a href={`toggler`}>Toggler</a>
    //         </li>
    //       </ul>
    //     </nav>
    //   </div>
    //   <div id="detail">
    //     <Outlet />
    //   </div>
    // </>

    <>
    <RouteCarousel />
    {/* <Outlet /> */}
    </>
  );
}


