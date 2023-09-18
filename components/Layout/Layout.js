// components/Layout.js
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ children }) => {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-12 col-md-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
