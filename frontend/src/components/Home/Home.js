import React, {useState, useEffect} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Home = () => {

    useEffect(() => {
    }, []);

    return (
        <>
            <div className="bs-docs-section">
              <div className="row">
                <div className="col-lg-12">
                  <div className="page-header">
                    <h1 id="typography">Manage Risks</h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="bs-component">
                    <h1>Fire risk</h1>
                    <h2>Flood risk</h2>
                    <h3>Earthquake risk</h3>
                    <h4>Cybersecurity risk</h4>
                    <h5>Data breach risk</h5>
                    <h6>Financial risk</h6>
                    <h3>
                      Market risk
                      <small className="text-body-secondary">
                        Operational risk
                      </small>
                    </h3>
                    <p className="lead">
                      Reputation risk, Regulatory risk, Compliance risk, Supply chain risk,
                      Environmental risk, Health and safety risk, Political risk, Economic risk,
                      Technological risk, Strategic risk, Legal risk, Social risk.
                    </p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="bs-component">
                    <h2>Risks Definition</h2>
                    <p>
                      refer to the potential for uncertain events or circumstances to have a
                      negative impact on objectives or outcomes. They are inherent in various
                      aspects of life, business, and decision-making. Risks can arise from a
                      wide range of sources, including financial market fluctuations,
                      natural disasters, technological failures, regulatory changes,
                      and more.


                    </p>
                    <p>
                      <small>Effective risk management involves identifying,
                      assessing, and mitigating these potential threats to minimize
                      their impact and optimize the chances of achieving desired outcomes.</small>
                    </p>
                    <p>
                      It is a crucial aspect of decision-making and <strong>strategic planning </strong>
                      in both personal and professional contexts.
                    </p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="bs-component">
                    <h2>Emphasis classes</h2>
                    <p className="text-primary">Climate Change and Environmental Degradation</p>
                    <p className="text-primary-emphasis">Pandemics and Health Emergencies</p>
                    <p className="text-secondary">Cybersecurity Threats</p>
                    <p className="text-secondary-emphasis">Geopolitical Tensions and Conflicts</p>
                    <p className="text-success">Economic Instability and Financial Crises</p>
                    <p className="text-success-emphasis">Natural Disasters</p>
                    <p className="text-danger">Nuclear Weapons Proliferation</p>
                    <p className="text-danger-emphasis">Technological Disruptions</p>
                    <p className="text-warning">Resource Scarcity and Water Crises</p>
                    <p className="text-warning-emphasis">Political and Social Instability</p>
                  </div>
                </div>
              </div>
            </div>
            <ToastContainer pauseOnHover theme="dark" position="bottom-right"/>
        </>
    )
}