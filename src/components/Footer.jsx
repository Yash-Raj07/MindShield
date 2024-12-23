import "./footer.css";

function Footer() {
    return (
        <footer className="footer">
            <p className="footer-year">
                © {new Date().getFullYear()} ShieldMe All Rights Reserved.
            </p>
        </footer>
    );
}

export default Footer;
