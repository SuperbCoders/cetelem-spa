import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import cls from 'classnames';
import _capitalize from 'lodash/capitalize';
import _times from 'lodash/times';
import _get from 'lodash/get';

import PageLoading from '../../../../routes/PageLoading';
import Container from '../../../base/Container';
import Button from '../../../base/Button';
import Modal from '../../../organisms/Modal';

import PinIcon from '../../../icons/PinIcon';

import { loadCarDetail, carsInfoLoaded } from '../../../../redux/modules/car/actions';
import { bookCar, resetToInitial } from '../../../../redux/modules/book/actions';
import { getDealerInfo } from '../../../../redux/modules/dealer/info/actions';

import formatNumber from '../../../../utilities/formatNumber';
import { withLayoutContext } from '../../../../utilities/layoutContext';

import BookForm from './blocks/BookForm';
import DealerMap from './blocks/DealerMap';
import Gallery from './blocks/Gallery';

import styles from './CarsDetail.module.scss';

class CarsDetail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      openBookModal: false,
    };

    this.dealerMapRef = React.createRef();
  }

  componentDidMount() {
    const {
      location: { query = {} },
      history,
      dispatch,
    } = this.props;
    if (!('car_id' in query)) {
      history.replace('/cars');
      return;
    }
    dispatch(loadCarDetail(query.car_id)).then(dealerId => {
      if (dealerId) {
        dispatch(getDealerInfo(dealerId)).then(() => dispatch(carsInfoLoaded()));
      }
    });
  }

  handleOpenBookForm = () => this.setState({ openBookModal: true });

  handleCloseBookForm = () => {
    const { book, dispatch } = this.props;
    this.setState({ openBookModal: false });
    if (!book.initial) {
      dispatch(resetToInitial());
    }
  };

  handleSubmitBookForm = values => {
    const { car, dispatch } = this.props;
    dispatch(
      bookCar(car.id, {
        ...values,
        vin: car.vin,
      })
    );
  };

  goToMap = () => {
    const mapRef = this.dealerMapRef.current;
    if (mapRef) {
      window.scroll({ top: mapRef.offsetTop - 85, left: 0, behavior: 'smooth' });
    }
  };

  getFormattedVin = value => {
    if (!value) {
      return '';
    }

    const visiblePath = value.substring(0, 4);
    const hiddenPath = value.substring(4);

    return `${visiblePath}${hiddenPath.replace(/./g, '*')}`;
  };

  getEngineInfo = car => {
    let engine = '';
    if (car.engine_volume) {
      engine += `${car.engine_volume} л`;
    }
    if (car.engine_hp) {
      engine = engine ? `${engine} / ${car.engine_hp} л.с.` : `${car.engine_hp} л.с.`;
    }
    return engine;
  };

  getSortedFeatures = car => {
    if (!car.extra_options) {
      return [];
    }

    const options = car.extra_options.map(option => option.name).sort();
    const itemPerColumn = Math.ceil(options.length / 2);
    return _times(2, index => options.slice(index * itemPerColumn, (index + 1) * itemPerColumn));
  };

  renderDealerAddress = info => {
    if (!info) {
      return 'Адрес не указан';
    }

    let address = '';
    if (info.street) {
      address = `${info.street}`;
    }
    if (info.building) {
      address = address ? `${address}, ${info.building}` : info.building;
    }
    if (info.city) {
      address = address ? `${address}, ${info.city}` : info.city;
    }
    if (info.region) {
      address = address ? `${address}, <br />${info.region}` : info.region;
    }
    if (info.postcode) {
      address = address ? `${address}, ${info.postcode}` : info.postcode;
    }

    // eslint-disable-next-line react/no-danger
    return <span dangerouslySetInnerHTML={{ __html: address }} />;
  };

  renderDealerInfo = () => {
    const { dealer } = this.props;
    return (
      <button type="button" className={styles.companyHead} onClick={this.goToMap}>
        <div className={styles.pinIconWrap}>
          <PinIcon className={styles.pinIcon} />
        </div>
        <div className={styles.dealerContent}>
          <h3 className={styles.dealerName}>{dealer.trade_name}</h3>
          <p className={styles.dealerAddress}>{this.renderDealerAddress(dealer.address)}</p>
        </div>
      </button>
    );
  };

  renderHead() {
    const { car, viewportWidth } = this.props;
    const carName = `${car.mark} ${car.model}`;
    return (
      <div className={styles.head}>
        <div className={styles.autoHead}>
          <div className={styles.imageWrap}>
            <img
              className={styles.image}
              src={`/logo/${car.mark.toLowerCase()}.png`}
              alt={carName}
            />
          </div>
          <div className={styles.contentWrap}>
            <h1 className={styles.title}>{carName}</h1>
            <div className={styles.contentInfo}>
              <span className={styles.stock}>{car.availability}</span>
              <span className={styles.vin}>VIN: {this.getFormattedVin(car.vin)}</span>
            </div>
          </div>
        </div>
        {viewportWidth > 1099 && this.renderDealerInfo()}
      </div>
    );
  }

  renderShortInfo() {
    const { car } = this.props;
    const engine = this.getEngineInfo(car);

    return (
      <div className={styles.shortInfo}>
        <div className={styles.shortItem}>
          <span className={styles.shortName}>Состояние</span>
          <span className={styles.shortValue}>{car.new ? 'Новый' : 'БУ'}</span>
        </div>
        {car.year && (
          <div className={styles.shortItem}>
            <span className={styles.shortName}>Год выпуска</span>
            <span className={styles.shortValue}>{car.year}</span>
          </div>
        )}
        {car.body_type && (
          <div className={styles.shortItem}>
            <span className={styles.shortName}>Кузов</span>
            <span className={styles.shortValue}>{car.body_type}</span>
          </div>
        )}
        {car.wheel && (
          <div className={styles.shortItem}>
            <span className={styles.shortName}>Руль</span>
            <span className={styles.shortValue}>{car.wheel}</span>
          </div>
        )}
        {engine && (
          <div className={styles.shortItem}>
            <span className={styles.shortName}>Двигатель</span>
            <span className={styles.shortValue}>{engine}</span>
          </div>
        )}
        {car.engine_type && (
          <div className={styles.shortItem}>
            <span className={styles.shortName}>Тип двигателя</span>
            <span className={styles.engine_type}>{car.engine_type}</span>
          </div>
        )}
      </div>
    );
  }

  renderMainFeatures() {
    const { car } = this.props;

    return (
      <div className={styles.mainFeatures}>
        {car.registry_year && (
          <div className={styles.featureItem}>
            <div className={styles.featureName}>Год регистрации</div>
            <div className={styles.featureValue}>{car.registry_year}</div>
          </div>
        )}
        {car.run !== null && (
          <div className={styles.featureItem}>
            <div className={styles.featureName}>Пробег</div>
            <div className={styles.featureValue}>{car.run} км</div>
          </div>
        )}
        {car.complectation && (
          <div className={styles.featureItem}>
            <div className={styles.featureName}>Комплектация</div>
            <div className={styles.featureValue}>{car.complectation}</div>
          </div>
        )}
        {car.modification && (
          <div className={styles.featureItem}>
            <div className={styles.featureName}>Модификация</div>
            <div className={styles.featureValue}>{car.modification}</div>
          </div>
        )}
        {car.color && (
          <div className={styles.featureItem}>
            <div className={styles.featureName}>Цвет</div>
            <div className={styles.featureValue}>{_capitalize(car.color)}</div>
          </div>
        )}
        <div className={styles.featureItem}>
          <div className={styles.featureName}>Металик</div>
          <div className={styles.featureValue}>{car.metallic ? 'Да' : 'Нет'}</div>
        </div>
      </div>
    );
  }

  renderAdditionalFeatures() {
    const { car } = this.props;
    const columns = this.getSortedFeatures(car);

    if (!columns.length) {
      return null;
    }

    return (
      <div className={styles.additionalFeatures}>
        {columns.map((column, columnIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={columnIndex} className={styles.additionalFeaturesColumn}>
            {column.map((option, optionIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={optionIndex} className={styles.additionalFeatureItem}>
                {option}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  renderPriceSidebar() {
    const { car } = this.props;
    const salePrice = car.tradein_discount ? car.price - car.tradein_discount : car.price;

    return (
      <div className={styles.priceSidebar}>
        <h3 className={styles.pricesTitle}>Минимальная цена</h3>
        <div className={styles.totalPrice}>
          <span className={cls(styles.basePrice, styles.priceWithSale)}>
            {formatNumber(salePrice)} ₽
          </span>
          {salePrice < car.price ? (
            <span className={cls(styles.basePrice, styles.priceSale)}>
              {formatNumber(car.price)} ₽
            </span>
          ) : null}
        </div>
        <div className={styles.salesBlock}>
          {/* {car.credit_discount && ( */}
          {/*  <div className={styles.saleItem}> */}
          {/*    <span className={styles.saleName}>При покупке в кредит</span> */}
          {/*    <span className={styles.saleValue}>- {formatNumber(car.credit_discount)} ₽</span> */}
          {/*  </div> */}
          {/* )} */}
          {/* {car.insurance_discount && ( */}
          {/*  <div className={styles.saleItem}> */}
          {/*    <span className={styles.saleName}>При покупке страховки</span> */}
          {/*    <span className={styles.saleValue}>- {formatNumber(car.insurance_discount)} ₽</span> */}
          {/*  </div> */}
          {/* )} */}
          {Boolean(car.tradein_discount) && (
            <div className={styles.saleItem}>
              <span className={styles.saleName}>Trade-In</span>
              <span className={styles.saleValue}>- {formatNumber(car.tradein_discount)} ₽</span>
            </div>
          )}
        </div>
        {/* <div className={styles.paymentsList}> */}
        {/*  <div className={styles.paymentItem}> */}
        {/*    <div className={styles.paymentName}>Ежемесячный платеж</div> */}
        {/*    <div className={styles.paymentValue}>84 000 ₽ / месяц</div> */}
        {/*  </div> */}
        {/*  <div className={styles.paymentItem}> */}
        {/*    <div className={styles.paymentName}>Общая сумма займа</div> */}
        {/*    <div className={styles.paymentValue}>3 000 000 ₽</div> */}
        {/*  </div> */}
        {/*  <div className={styles.paymentItem}> */}
        {/*    <div className={styles.paymentName}>Дофинансирование</div> */}
        {/*    <div className={styles.paymentValue}>1 500 000 ₽</div> */}
        {/*  </div> */}
        {/* </div> */}
        <Button
          className={styles.bookButton}
          text="Бронировать"
          onClick={this.handleOpenBookForm}
        />
      </div>
    );
  }

  render() {
    const { openBookModal } = this.state;
    const { car, carStatuses, dealer, book, viewportWidth, layout } = this.props;

    if (carStatuses.error) {
      return <div>Error {JSON.stringify(carStatuses.error)}</div>;
    }

    if (!carStatuses.success) {
      return <PageLoading />;
    }

    const images = (car.images || []).map((image, index) => ({
      src: image,
      index,
    }));

    return (
      <div className={styles.container}>
        <Container>
          <div className={styles.wrapper}>
            <div className={styles.top}>
              {this.renderHead()}
              {images.length && <Gallery images={images} />}
              {this.renderShortInfo()}
              {viewportWidth < 1100 && this.renderDealerInfo()}
            </div>
            {Boolean(car.description) && (
              <p
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: car.description }}
              />
            )}
            <div className={styles.info}>
              <h2 className={styles.infoTitle}>Дополнительные характеристики</h2>
              {this.renderMainFeatures()}
              {this.renderAdditionalFeatures()}
              {!layout.isMobile && this.renderPriceSidebar()}
            </div>
            <DealerMap
              ref={this.dealerMapRef}
              name={dealer.trade_name}
              address={this.renderDealerAddress(dealer.address)}
              rating={_get(dealer, 'rate', 0)}
              location={_get(dealer, 'address.location', { x: 55.751574, y: 37.573856 })}
              phone={_get(dealer, 'contact_infos.0.value', '')}
            />
            {layout.isMobile && this.renderPriceSidebar()}
          </div>
        </Container>
        <Modal
          id="book-modal"
          open={openBookModal}
          onClose={this.handleCloseBookForm}
          dark={book.success}
        >
          <BookForm
            bookInfo={book}
            carName={`${car.mark} ${car.model}`}
            carImage={_get(images, '0.src', '/images/book-auto.jpg')}
            modification={car.modification}
            onSubmitForm={this.handleSubmitBookForm}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    car: state.car.data,
    carStatuses: {
      error: state.car.error,
      success: state.car.success,
    },
    dealer: state.dealer.info.data,
    book: state.book,
  };
};

export default connect(mapStateToProps)(withLayoutContext(CarsDetail));
