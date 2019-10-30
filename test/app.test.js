/* eslint-disable strict */
const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app');

describe('GET /', () =>{
  it('should return array of apps', () =>{
    return supertest(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res =>{
        expect(res.body).to.be.an('array');
      });
  });

  it('should return filtered apps with a search param provided', () => {
    return supertest(app)
      .get('/')
      .query({App: 'Solitaire'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.eql(20);
      });
  });

  it('should respond with 200 with filtered apps when search param is present', () => {
    return supertest(app)
      .get('/')
      .query({app: 'Solitaire'})
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(20);
      });
  });

  it('should sort by app', () =>{
    return supertest(app)
      .get('/')
      .query({ sort: 'app' })
      .expect(200)
      .then(res =>{
        expect(res.body).to.be.an('array');
        let sorted = true;

        let i=0;
        while(i < res.body.length -1){
          const appAtI = res.body[i];
          const appAtIPlus1 = res.body[i + 1];

          if (appAtIPlus1.App < appAtI.App){
            sorted = false;
            break;
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });

  it('should sort by rating', () =>{
    return supertest(app)
      .get('/')
      .query({ sort: 'rating' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) =>{
        expect(res.body).to.be.an('array');
        let sorted = true;

        let i=0;
        while(i < res.body.length -1){
          const appAtI = res.body[i];
          const appAtIPlus1 = res.body[i + 1];

          if (appAtIPlus1.Rating > appAtI.Rating){
            sorted = false;
            break;
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });
  
  it('should respond with 200 and array of apps', () => {
    return supertest(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(20);
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0]).to.include.keys(
          'App','Rating', 'Android Ver', 'Category','Content Rating', 'Current Ver', 'Genres', 'Installs',
          'Last Updated','Price', 'Reviews', 'Size', 'Type'
        );
      });
  });
});

