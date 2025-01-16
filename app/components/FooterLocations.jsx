import React, {useState, useEffect} from 'react';
import {setKey, setLanguage, fromLatLng} from 'react-geocode';
import iphoneIcon from '~/assets/iphone.svg';
import emailIcon from '~/assets/email.svg';

setKey('AIzaSyAXPdYeizLvhCpF48KBT7TGjnhNgC05Iio');
setLanguage('en');

export default function FooterLocations() {
  const [postalCode, setPostalCode] = useState(null);
  const [state, setState] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {latitude, longitude} = position.coords;
          fromLatLng(latitude, longitude).then(
            (response) => {
              const addressComponents = response.results[0].address_components;
              const stateComponent = addressComponents.find((component) =>
                component.types.includes('administrative_area_level_1'),
              );
              const postalCodeComponent = addressComponents.find((component) =>
                component.types.includes('postal_code'),
              );
              setState(stateComponent.long_name);
              setPostalCode(postalCodeComponent.long_name);
            },
            (error) => {
              console.error('Error getting postal code:', error);
            },
          );
        },
        (error) => {
          console.error('Error getting location:', error);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div className="location-group">
      <h4>iKrusher Location Near Me</h4>
      {state && postalCode ? (
        <div className="location-address">
          {state === 'California' && Number(postalCode) <= 93200 && (
            <React.Fragment>
              <p>13100 Spring St., Baldwin Park, CA 91706</p>
              <p>
                <img src={iphoneIcon} alt="iKrusher icon" />
                <a href="tel:+16262563449">(626) 256-3449</a>
              </p>
            </React.Fragment>
          )}
          {state === 'California' && Number(postalCode) > 93200 && (
            <React.Fragment>
              <p>710 Alfred Nobel Dr., Hercules, CA 94547</p>
              <p>
                <img src={iphoneIcon} alt="iKrusher icon" />
                <a href="tel:+14159360663">(415) 936-0663</a>
              </p>
            </React.Fragment>
          )}
          {(state === 'Washington' ||
            state === 'Oregon' ||
            state === 'Idaho' ||
            state === 'Montana') && (
            <React.Fragment>
              <p>220 S Findlay St, Seattle, WA 98108</p>
              <p>
                <img src={iphoneIcon} alt="iKrusher icon" />
                <a href="tel:+12069443115">(206) 944-3115</a>
              </p>
            </React.Fragment>
          )}
          {(state == 'Alaska' ||
            state == 'Arizona' ||
            state == 'Hawaii' ||
            state == 'Nevada' ||
            state == 'New Mexico' ||
            state == 'Texas' ||
            state == 'Utah') && (
            <React.Fragment>
              <p>20815 N 25th Pl., #A107, Phoenix, AZ 85050</p>
              <p>
                <img src={iphoneIcon} alt="iKrusher icon" />
                <a href="tel:+16026753255">(602) 675-3255</a>
              </p>
            </React.Fragment>
          )}
          {(state == 'Arkansas' ||
            state == 'Colorado' ||
            state == 'Iowa' ||
            state == 'Kansas' ||
            state == 'Missouri' ||
            state == 'Nebraska' ||
            state == 'North Dakota' ||
            state == 'Oklahoma' ||
            state == 'South Dakota' ||
            state == 'Wyoming') && (
            <React.Fragment>
              <p>791 Southpark Dr., #600, Littleton, CO 80120</p>
              <p>
                <img src={iphoneIcon} alt="iKrusher icon" />
                <a href="tel:+17205191348">(720) 519-1348</a>
              </p>
            </React.Fragment>
          )}
          {(state == 'Alabama' ||
            state == 'Georgia' ||
            state == 'Illinois' ||
            state == 'Indiana' ||
            state == 'Kentucky' ||
            state == 'Louisiana' ||
            state == 'Michigan' ||
            state == 'Minnesota' ||
            state == 'Mississippi' ||
            state == 'North Carolina' ||
            state == 'Ohio' ||
            state == 'Puerto Rico' ||
            state == 'South Carolina' ||
            state == 'Tennessee' ||
            state == 'Virginia' ||
            state == 'West Virginia' ||
            state == 'Wisconsin') && (
            <React.Fragment>
              <p>23430 Industrial Park Ct., Farmington Hills, MI 48335</p>
              <p>
                <img src={iphoneIcon} alt="iKrusher icon" />
                <a href="tel:+13137658008">(313) 765-8008</a>
              </p>
            </React.Fragment>
          )}
          {(state == 'New Jersey' ||
            state == 'Connecticut' ||
            state == 'District of Columbia' ||
            state == 'Delaware' ||
            state == 'Massachusetts' ||
            state == 'Maryland' ||
            state == 'Maine' ||
            state == 'New Hampshire' ||
            state == 'New York' ||
            state == 'Pennsylvania' ||
            state == 'Rhode Island' ||
            state == 'Vermont') && (
            <React.Fragment>
              <p>3575 Kennedy Rd, South Plainfield, NJ 07080</p>
              <p>
                <img src={iphoneIcon} alt="iKrusher icon" />
                <a href="tel:+19083328676">(908) 332-8676</a>
              </p>
            </React.Fragment>
          )}
          <p>
            <img src={emailIcon} alt="iKrusher icon" />
            <a href="mailto:inquiry@ikrusher.com">inquiry@ikrusher.com</a>
          </p>
        </div>
      ) : (
        <div className="location-address">
          <p>13100 Spring St., Baldwin Park, CA 91706</p>
          <p>
            <img src={iphoneIcon} alt="iKrusher icon" />
            <a href="tel:+16262563449">(626) 256-3449</a>
          </p>
          <p>
            <img src={emailIcon} alt="iKrusher icon" />
            <a href="mailto:inquiry@ikrusher.com">inquiry@ikrusher.com</a>
          </p>
        </div>
      )}
    </div>
  );
}
