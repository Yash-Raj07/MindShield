import "./TeamCard.css";

export function TeamCard() {
    const teamMembers = [
        {
            quote:
                "Accomplished the development of the Journal feature backend, ensuring seamless data management and retrieval. ",
            name: "Harinee",
            designation: "Software Developer",
            src: "harinee_profile.jpg",
        },
        {
            quote:
                "Successfully built and integrated the frontend and backend systems for Authentication, SOS Alerts, and Journal features, optimizing real-time user interactions and security protocols.",
            name: "Ajay Negi",
            designation: "Software Engineer",
            src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop",
        },
        {
            quote:
                "Designed the frontend part, streamlining the user experience and enabling intuitive interaction.",
            name: "Yash Raj",
            designation: "Java Developer",
            src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop",
        },
    ];


    return (
        <div className="team-card-container">
            {teamMembers.map((member, index) => (
                <div key={index} className="team-card">
                    <img src={member.src} alt={member.name} className="team-card-image" />
                    <h3 className="team-card-name">{member.name}</h3>
                    <p className="team-card-designation">{member.designation}</p>
                    <p className="team-card-quote">{member.quote}</p>
                </div>
            ))}
        </div>
    );
}
