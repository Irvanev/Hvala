import { useHistory, useParams } from "react-router-dom";

const NavbarForMobileRouting = () => {
    const history = useHistory();

    const handleShare = () => {
        if (navigator.share) {
          navigator.share({
            title: 'Поделиться страницей',
            url: window.location.href
          }).then(() => {
            console.log('Успешное открытие диалога "Поделиться"');
          })
            .catch((error) => {
              console.log('Ошибка при открытии диалога "Поделиться"', error);
            });
        } else {
          navigator.clipboard.writeText(window.location.href)
            .then(() => {
              console.log('Ссылка скопирована в буфер обмена');
              alert('Ссылка скопирована в буфер обмена');
            })
            .catch((err) => {
              console.log('Ошибка при копировании ссылки в буфер обмена', err);
            });
        }
      };

      const goBack = () => {
        history.goBack();
      };

    return ( 
        <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light d-lg-none">
        <div className="container">
          <ul className="navbar-nav me-auto mb-md-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                onClick={goBack}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav d-flex">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" onClick={handleShare}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                  className="bi bi-share" viewBox="0 0 16 16">
                  <path d="M4 4a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm8-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-8 2v3.586l2.828-2.828a1 1 0 0 1 1.414 0 1 1 0 0 1 0 1.414L4 12.414V10a2 2 0 1 0 0-4zm8 2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </nav>
     );
}
 
export default NavbarForMobileRouting;