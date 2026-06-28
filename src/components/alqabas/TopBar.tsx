import { TwitterIcon, WhatsAppIcon, TelegramIcon, InstagramIcon, FacebookIcon, YoutubeIcon, SnapchatIcon, TikTokIcon, CloseIcon } from "./icons";

export default function TopBar() {
  return (
    <div className="sideMenu_sidenav__23bO3 sideMenu_sidenavClose__3EdOc">
      {/* Editors Info Bar */}
      <div className="editorsContent_editorsContentContainer__2Tp50" style={{ height: 0 }}>
        <div className="editorsContent_leftContainer__1MvGL">
          <p className="editorsContent_rightText__2Phid">رئيس التحرير: وليد عبداللطيف النصف</p>
          <span className="editorsContent_border__2lf80" />
          <p className="editorsContent_vpEditorText__22dlZ">نائب رئيس التحرير: عبدالله غازي المضف</p>
        </div>

        <div className="editorsContent_middleContainer__1W5LT">
          {/* Social Media Icons - Desktop */}
          <div className="landingSocialMediaBox_boxContainer__37lkF">
            <span className="landingSocialMediaBox_iconContainer__3ozbN"><TwitterIcon size={14} /></span>
            <span className="landingSocialMediaBox_iconContainer__3ozbN"><WhatsAppIcon size={15} /></span>
            <span className="landingSocialMediaBox_iconContainer__3ozbN"><TikTokIcon size={14} /></span>
            <span className="landingSocialMediaBox_iconContainer__3ozbN"><InstagramIcon size={15} /></span>
            <span className="landingSocialMediaBox_iconContainer__3ozbN"><FacebookIcon size={8} /></span>
            <span className="landingSocialMediaBox_iconContainer__3ozbN"><TwitterIcon size={24} /></span>
            <span className="landingSocialMediaBox_iconContainer__3ozbN"><YoutubeIcon size={20} /></span>
            <span className="landingSocialMediaBox_iconContainer__3ozbN"><TelegramIcon size={16} /></span>
          </div>
        </div>

        <div className="editorsContent_rightContainer__3sNC3">
          <div className="editorsContent_rightTextContainer__1Kyi9">
            <a href="/electrony/" className="">
              <p className="editorsContent_archive__3mgjV">عرض أرشيف الأعداد</p>
            </a>
          </div>
          <span className="editorsContent_newsletterIcon__14-Ib" />
        </div>
      </div>

      {/* Mid Header */}
      <div className="sideMenu_midHeader__EeUfw">
        <div className="sideMenu_closeIconWrapper__1Kv-H">
          <CloseIcon size={16} color="white" />
        </div>
        <div className="sideMenu_rightContainer__2wfeX">
          <div className="align-items-center row no-gutters">
            <div className="mr-3 pr-3 sideMenu_podcastContainer__24RwE">
              <a href="/categories/64746/">
                <div className="clickable">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25">
                    <g fill="none" fillRule="evenodd">
                      <g fill="#fff" stroke="#fff" strokeWidth=".4">
                        <g>
                          <path d="M9.365 24.136l1.007-1.745.719-1.245.03-.052c-.766-.626-1.29-1.47-1.537-2.387-.222-.83-.217-1.72.044-2.565l.238.137 1.323.765c.353.203.808.081 1.012-.272.204-.353.082-.809-.27-1.013l-1.324-.764-.337-.194.741-1.284.337.195 1.323.763c.354.204.809.083 1.013-.271.204-.353.082-.808-.272-1.012l-1.323-.764-.336-.195.74-1.284.338.195 1.323.763c.353.205.808.082 1.012-.27.204-.354.082-.81-.27-1.013l-1.324-.764-.238-.137c.602-.649 1.37-1.098 2.2-1.32 1.145-.308 2.406-.18 3.507.455 1.101.636 1.842 1.664 2.15 2.81.222.83.216 1.72-.045 2.565l-.237-.137-1.297-.75c-.354-.203-.809-.08-1.013.272-.204.354-.082.809.271 1.013l1.298.749.336.194-.74 1.284-.338-.194-1.297-.75c-.353-.203-.808-.081-1.012.272-.204.353-.082.808.27 1.013l1.298.748.337.195-.741 1.284-.337-.195-1.297-.749c-.354-.204-.81-.081-1.013.272-.204.353-.082.808.271 1.012l1.297.75.238.136c-.602.649-1.37 1.099-2.2 1.32-.917.246-1.91.214-2.835-.137l-.03.053-.719 1.244-1.007 1.746 1.283.74 1.196-2.07c.84.125 1.69.073 2.496-.143 1.422-.381 2.708-1.27 3.555-2.585l.156-.255.23-.398.74-1.284.742-1.284.741-1.284.23-.397c.84-1.456 1.009-3.121.604-4.633-.405-1.512-1.384-2.87-2.84-3.71-1.454-.841-3.12-1.01-4.633-.605-1.511.406-2.87 1.385-3.71 2.84l-.23.398-.74 1.284-.742 1.284-.741 1.283-.23.398-.15.26.007.003c-.715 1.391-.842 2.95-.461 4.37.216.807.596 1.57 1.124 2.234l-1.195 2.071 1.284.741z" />
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
              </a>
            </div>
            <div className="authUserbtns_singupContainer__guA8M">
              <button className="customButton_customButton__NZlrE authUserbtns_subscribeButton__GoNP0" type="button" style={{ opacity: 1 }}>
                الاشتراكات
              </button>
              <p className="authUserbtns_loginText__1Mw8x">تسجيل الدخول</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}