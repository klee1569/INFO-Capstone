
import Navbar from "../../components/Navbar.jsx";
import Link from "next/link";

export default function Home(){
    return (
        <div className="Home">
            <Navbar />
    
        <main className="Home">
            <section className="hero">
                <br></br>
                <h1>Understand the U.S. Healthcare system in simple terms <em>easily.</em></h1>
                <p> WellKare helps you navigate the United States Healthcare
                    system confidently with all the needed resources available.
                </p>
            </section>

            <section>
                <h2>How we can help you</h2>
                <br></br>
                <div className="feature-grid-1">
                    <div className="feature-grid-card">
                        <h3>Glossary</h3>
                        <p>
                            Learn the definitions of common
                            healthcare and insurance terms to better understand medical services in the 
                            United States.
                        </p>
                        <a href="/glossary"> <br></br>View Glossary → </a>
                    </div>
                   

                    <div className="feature-grid-card">
                        <h3> Appointment Making </h3>
                        <p>
                            Figuring out how to schedule an appointment can be hard, but
                            we will walk you through the steps and help guide you on how to register for 
                            the right appointment.
                        </p>
                        <Link href="/appointment">Making an Appointment → </Link>
                    </div>
            

                    <div className="feature-grid-card">
                        <h3> Decision Guide</h3>
                        <p>
                            Find out where to go for medical care.
                        </p>

                        <Link href="/decision tree"> <br></br>Learn More → </Link>
                    </div>
                </div>
            </section>
        </main>
        </div>
    )
}
