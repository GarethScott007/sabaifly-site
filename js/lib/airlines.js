export const airlineLogo = (iata, w = 120, h = 40) =>
  iata ? `https://pics.avs.io/${w}/${h}/${String(iata).toUpperCase()}.png`
       : '/img/airlines/placeholder.svg';
