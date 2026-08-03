import countries from 'world-countries';

export interface CountryCallingCodeOption {
  callingCode: string;
  countryCode: string;
  flag: string;
  name: string;
}

function getCallingCode(root: string, suffixes: readonly string[]): string | null {
  if (!root) {
    return null;
  }

  if (root === '+1') {
    return root;
  }

  const suffix = suffixes.find((value) => `${root}${value}`.replace(/\D/g, '').length <= 3);
  return suffix ? `${root}${suffix}` : root;
}

export const countryCallingCodeOptions: readonly CountryCallingCodeOption[] = countries
  .map((country): CountryCallingCodeOption | null => {
    const callingCode = getCallingCode(country.idd.root, country.idd.suffixes);

    if (!callingCode) {
      return null;
    }

    return {
      callingCode,
      countryCode: country.cca2,
      flag: country.flag,
      name: country.name.common,
    };
  })
  .filter((country): country is CountryCallingCodeOption => country !== null)
  .sort((firstCountry, secondCountry) => firstCountry.name.localeCompare(secondCountry.name));
