import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header.tsx';
import CardList from '../../components/card-list/card-list.tsx';
import Footer from '../../components/footer/footer.tsx';
import { TFlatInfo } from '../../types/index.ts';

export default function FavoritesPage(): JSX.Element {

  const amsterdamFavorites: TFlatInfo[] = [
    {
      id: 6,
      title: 'title 6',
      price: 600,
      previewImage: 'img/room.jpg',
      desc: 'desc6'
    },
    {
      id: 7,
      title: 'title 7',
      price: 700,
      previewImage: 'img/room.jpg',
      desc: 'desc7'
    },
    {
      id: 8,
      title: 'title 8',
      price: 800,
      previewImage: 'img/room.jpg',
      desc: 'desc8'
    }
  ];

  const cologneFavorites: TFlatInfo[] = [
    {
      id: 9,
      title: 'title 9',
      price: 900,
      previewImage: 'img/room.jpg',
      desc: 'desc9'
    },
    {
      id: 10,
      title: 'title 10',
      price: 1000,
      previewImage: 'img/room.jpg',
      desc: 'desc10'
    },
    {
      id: 11,
      title: 'title 11',
      price: 1100,
      previewImage: 'img/room.jpg',
      desc: 'desc11'
    }
  ];

  return (
    <div className="page">
      <Header />
      <Helmet>
        <title>6 Cities: Your Favorites</title>
      </Helmet>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to="#">
                      <span>Amsterdam</span>
                    </Link>
                  </div>
                </div>
                <div className="favorites__places">
                  <CardList offers={amsterdamFavorites} page={'favorites'} />
                </div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to="#">
                      <span>Cologne</span>
                    </Link>
                  </div>
                </div>
                <div className="favorites__places">
                  <CardList offers={cologneFavorites} page={'favorites'} />
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
