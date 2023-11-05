import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header.tsx';
import LocationsHeader from '../../components/locations-header/locations-header.tsx';
import CardList from '../../components/card-list/card-list.tsx';
import Map from '../../components/map/map.tsx';
import { City } from '../../mocks/cities.ts';
import { TMainPageProps, TPoint } from '../../types/index.ts';

export default function MainPage({offers}: TMainPageProps): JSX.Element {

  const [activeOffer, setActiveOffer] = useState<TPoint | null>(null);

  function handleCardHover(point: TPoint | null) {
    setActiveOffer(point);
  }

  const points: TPoint[] = [];
  offers.forEach((offer) => points.push({
    id: offer.id,
    location: offer.location
  }));

  return (
    <div className="page page--gray page--main">
      <Header />
      <Helmet>
        <title>6 Cities</title>
      </Helmet>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationsHeader />
        </div>
        <div className="cities">
          {offers.length === 0 ?
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
            :
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in Amsterdam</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                    <li className="places__option" tabIndex={0}>Price: low to high</li>
                    <li className="places__option" tabIndex={0}>Price: high to low</li>
                    <li className="places__option" tabIndex={0}>Top rated first</li>
                  </ul>
                </form>
                <div className="cities__places-list places__list tabs__content">
                  <CardList offers={offers} page={'cities'} onCardHover={handleCardHover} />
                </div>
              </section>
              <div className="cities__right-section">
                <Map city={City} points={points} activePoint={activeOffer}/>
              </div>
            </div>}
        </div>
      </main>
    </div>
  );
}
