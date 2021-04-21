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

    // find all region by region_id
    describe("GET /api/regions/:id", () => {
        it("It should GET a regions by ID", (done) => {
            const regionId = 2;
            chai.request(server)
                .get("/api/regions/" + regionId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('region_id');
                    response.body.should.have.property('region_name');
                    response.body.should.have.property('region_id').eq(2);
                    done();
                });
        });

        it("It should NOT GET a region by ID", (done) => {
            const regionId = 123;
            chai.request(server)
                .get("/api/region" + regionId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.contains("html")
                    done();
                });
        });

    });

      /**
     * Test the POST route
     */
       describe("POST /api/regions", () => {
        it("It should POST a new region", (done) => {
            const region = {
                region_name: "Asia Timur"
            };
            chai.request(server)                
                .post("/api/regions/")
                .send(region)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('region_name').eq("Asia Timur");
                done();
                });
        });

        /* it("It should NOT POST a new region without the name property", (done) => {
            const region = {
                region_name :undefined
            };
            chai.request(server)                
                .post("/api/regions")
                .send(region)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("The name should be at least 3 chars long!");
                done();
                });
        }); */

    });


    /**
     * Test the PUT route
     */
     describe("PUT /api/regions/:id", () => {
        it("It should PUT an existing region", (done) => {
            const regionId = 1;
            const region = {
                region_name: "region 1 changed"
            };
            chai.request(server)                
                .put("/api/regions/" + regionId)
                .send(region)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('region_id').eq(18);
                    response.body.should.have.property('region_name').eq("region 1 changed");
                done();
                });
        });

        it("It should NOT PUT an existing region with a name with less than 3 characters", (done) => {
            const regionId = 1;
            const region = {
                region_name: "Ta"
            };
            chai.request(server)                
                .put("/api/regions/" + regionId)
                .send(region)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("The name should be at least 3 chars long!");
                done();
                });
        });        
    });
    

    /**
     * Test the PATCH route
     */

    describe("PATCH /api/regions/:id", () => {
        it("It should PATCH an existing region", (done) => {
            const regionId = 1;
            const region = {
                region_name: "region 1 patch"
            };
            chai.request(server)                
                .patch("/api/regions/" + regionId)
                .send(region)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('region_id').eq(18);
                    response.body.should.have.property('region_name').eq("region 1 patch");
                done();
                });
        });

        it("It should NOT PATCH an existing region with a name with less than 3 characters", (done) => {
            const regionId = 16;
            const region = {
                name: "Asiaaaap"
            };
            chai.request(server)                
                .patch("/api/regions/" + regionId)
                .send(region)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("The name should be at least 3 chars long!");
                done();
                });
        });        
    });
    

    /**
     * Test the DELETE route
     */
    describe("DELETE /api/regions/:id", () => {
        it("It should DELETE an existing region", (done) => {
            const regionId = 16;
            chai.request(server)                
                .delete("/api/regions/" + regionId)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });

        it("It should NOT DELETE a region that is not in the database", (done) => {
            const regionId = 145;
            chai.request(server)                
                .delete("/api/regions/" + regionId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq("The region with the provided ID does not exist.");
                done();
                });
        });

    });
});