import "./Archive.css";

import hello from "../../assets/avatar.png";




import React, { Component } from 'react';
import Countries from 'countries-api';

import Pagination from './../../components/archive_card/Pagination'
import CountryCard from './../../components/archive_card/Archive_card';

class Archive extends Component {
  state = { allCountries: [], currentCountries: [], currentPage: null, totalPages: null }

  componentDidMount() {
    const { data: allCountries = [] } = Countries.findAll();
    this.setState({ allCountries });
  }
  render() {
    const { allCountries, currentCountries, currentPage, totalPages } = this.state;
    const totalCountries = allCountries.length;

    if (totalCountries === 0) return null;

    const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();

    return (
      <div className="container ">
        <div className="row d-flex flex-row py-5">
          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <h2 className={headerClass}>
                <strong className="text-secondary">{totalCountries}</strong> Dossiers
              </h2>
              { currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ totalPages }</span>
                </span>
              ) }
            </div>
            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination totalRecords={totalCountries} pageLimit={9} pageNeighbours={1} onPageChanged={this.onPageChanged} />
            </div>
          </div>
          { currentCountries.map(country => <CountryCard key={country.cca3} country={country} />) }
        </div>
      </div>
    );
  }
  onPageChanged = data => {
    const { allCountries } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentCountries = allCountries.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentCountries, totalPages });
  }
}

export default Archive;