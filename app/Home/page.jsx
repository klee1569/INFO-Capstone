
"use client";
import { useState, useMemo } from "react";
import Navbar from "../../components/Navbar.jsx";
import Link from "next/link";

export default function Home(){
    return (
        <main className="Home">
            <Link href="/">Home</Link>
            <section className="hero">
                
                <h1>Understand U.S. Healthcare in simple terms <br> <em>simply</em> </br></h1>
                <p> WellKare helps you navigate the united states health care
                    system confidently with all the nedded resources
                </p>
            </section>

            <div> 

            </div>

            

            
        </main>
    )
}