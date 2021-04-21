import server from '../server/server'
import chai from 'chai'
import chaiHttp from 'chai-http'

// Assertion 
chai.should();
chai.use(chaiHttp);

describe('region APIs', () => {
    // get all regions
    describe("Test GET route /api/regions", () => {

        it("It should return all regions", (done) => {
           
            chai.request(server)
                .get("/api/regions/")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.not.be.eq(0);
                    done();
                });

        });

        // negative test
        it("It should not return all regions", (done) => {
            chai.request(server)
                .get("/api/regio/")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

    });

    // end get all regions

    
});