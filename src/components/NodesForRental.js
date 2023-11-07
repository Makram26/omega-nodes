import React from "react";

export default function NodesForRental() {
  return (
    <>
      <section className="nodes_for_rental">
        <div className="container">
          <h3 className="text-center">
            Nodes <span>For</span> Rental
          </h3>
          <h3 className="mb-5 mt-5">Duration</h3>
          <div className="all-packages">
            <div className="row ml0 mr0">
              <div className="col-lg-12 col-md-12 col-sm-12 pl-0 pb-2">
                <small>One Day</small>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 box-style-shadow">
                <div className="row align-items-center">
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="location d-flex align-items-center">
                      <h5>Location:</h5>
                      <select
                        className="form-control"
                        aria-label="Default select"
                      >
                        <option>Select Location</option>
                        <option value="virginia">Virginia</option>
                        {/* <option value="frankfurt">Frankfurt</option> */}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="prices">
                      <h5>Prices:</h5>
                      <h5>0.5 Sol</h5>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="buy-now">
                      <a href="/" className="buy-now-daily">
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row ml0 mr0 mt-5">
              <div className="col-lg-12 col-md-12 col-sm-12 pl-0 pb-2">
                <small>One Week</small>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 box-style-shadow">
                <div className="row align-items-center">
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="location d-flex align-items-center">
                      <h5>Location:</h5>
                      <select
                        className="form-control"
                        aria-label="Default select"
                      >
                        <option>Select Location</option>
                        <option value="virginia">Virginia</option>
                        {/* <option value="frankfurt">Frankfurt</option> */}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="prices">
                      <h5>Prices:</h5>
                      <h5>1 Sol</h5>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="buy-now">
                      <a href="/" className="buy-now-weekly">
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row ml0 mr0 mt-5">
              <div className="col-lg-12 col-md-12 col-sm-12 pl-0 pb-2">
                <small>One Month</small>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 box-style-shadow">
                <div className="row align-items-center">
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="location d-flex align-items-center">
                      <h5>Location:</h5>
                      <select
                        className="form-control"
                        aria-label="Default select"
                      >
                        <option>Select Location</option>
                        <option value="virginia">Virginia</option>
                        {/* <option value="frankfurt">Frankfurt</option> */}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="prices">
                      <h5>Prices:</h5>
                      <h5>2 Sol</h5>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="buy-now">
                      <a href="/" className="buy-now-monthly">
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="buy-pkg-modal-form">
          <img
            src="/nodes_ninja_web/static/src/images/close.png"
            className="close-buy-pkg-modal-form"
            alt="Omega Nodes"
          />
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 form_default_color">
              <div className="form-wrap">
                <h2 className="text_center">
                  Add <span>Details</span> here
                </h2>
                <form
                  className="form_control"
                  action="/shop/cart/update"
                  method="post"
                >
                  <input
                    type="hidden"
                    name="csrf_token"
                    t-att-value="request.csrf_token()"
                  />

                  <div className="form_row md_grid_one">
                    <div className="form_col">
                      <label htmlFor="full_name">
                        Full Name
                        <span>*</span>
                      </label>
                      <input
                        type="text"
                        required=""
                        name="name"
                        id="full_name"
                      />
                    </div>
                    <div className="form_col">
                      <label htmlFor="email">
                        Email
                        <span>*</span>
                      </label>
                      <input type="email" required="" name="email" id="email" />
                    </div>
                  </div>
                  <div className="form_row clm_unset">
                    <div className="form_col">
                      <label htmlFor="no_of_slots">
                        No of slots
                        <span>*</span>
                      </label>
                      <input
                        type="number"
                        required=""
                        min="1"
                        max="10"
                        name="number_of_slots"
                        id="number_of_slots"
                      />
                    </div>
                  </div>
                  <div className="packages">
                    <label htmlFor="full_name">
                      You have Selected
                      <span>*</span>
                    </label>
                    <div className="form_row clm_three grid_clm_gap_50">
                      <div className="form_col pkg-daily">
                        <div className="select_pkg">
                          <div className="pkg selected pkg_first">
                            <img
                              src="/nodes_ninja_web/static/src/images/info_1.png"
                              alt="Omega Nodes"
                            />
                            <h4>0.5 Sol/Day</h4>
                          </div>
                        </div>
                      </div>
                      <div className="form_col pkg-weekly">
                        <div className="select_pkg">
                          <div className="pkg pkg_second">
                            <img
                              src="/nodes_ninja_web/static/src/images/info.png"
                              alt="Omega Nodes"
                            />
                            <h4>1 Sol/Week</h4>
                          </div>
                        </div>
                      </div>
                      <div className="form_col pkg-monthly">
                        <div className="select_pkg">
                          <div className="pkg pkg_third">
                            <img
                              src="/nodes_ninja_web/static/src/images/info_1.png"
                              alt="Omega Nodes"
                            />
                            <h4>2 Sol/Month</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form_actions">
                    <input
                      type="submit"
                      className="form_action_submit"
                      value="Checkout"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
