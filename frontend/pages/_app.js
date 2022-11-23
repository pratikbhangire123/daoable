import Footer from "../components/footer";
import Navbar from "../components/navbar";
import DAOProfileDataState from "../states/dao-profile-data";
import ExtensionState from "../states/extension";
import ProfileState from "../states/profile";
import ProfileDataState from "../states/profile-data";
import WalletState from "../states/wallet";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <WalletState>
      <ExtensionState>
        <DAOProfileDataState>
          <ProfileState>
            <ProfileDataState>
              <Navbar />
              <Component {...pageProps} />
              <Footer />
            </ProfileDataState>
          </ProfileState>
        </DAOProfileDataState>
      </ExtensionState>
    </WalletState>
  );
}

export default MyApp;
