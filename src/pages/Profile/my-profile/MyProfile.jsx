import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from './my-profile.module.css';

import { MyNavbar } from "../../../components/Navbar/Navbar";
import { NavBarLogout } from "../../../components/Navbar/NavBarLogout";
import OrangeButton from "../../../components/buttons/orange-button/OrangeButton";

import photoProfile from "../../../assets/person2.jpg";

import { Rate, Spin, Tabs, Empty, Modal, Badge, message, Input, Button } from "antd";

import { fetchUserProfile, fetchUserAdvertisment, fetchUserFeedback, fetchUserAdvertismentArchive } from "../../../services/profile/Profile";
import { fetchUserFavorites, removeFromFavorites } from "../../../services/favorites/FavoritesService";
import {
    fetchHvalaCoinWallet,
    fetchHvalaCoinTransactions,
    fetchReferralDebugByUserId,
} from "../../../services/hvalacoin/HvalaCoinService";
import CustomCard from "../../../components/card/CustomCard";

const { TabPane } = Tabs;

const MyProfile = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const [user, setUser] = useState(null);
    const [advertisment, setAdvertisment] = useState([]);
    const [advertismentArchive, setAdvertismentArchive] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [hvalaCoinBalance, setHvalaCoinBalance] = useState(0);
    const [hvalaCoinTx, setHvalaCoinTx] = useState([]);
    const [referralCode, setReferralCode] = useState("");
    const [refDebugUserId, setRefDebugUserId] = useState("");
    const [refDebugData, setRefDebugData] = useState(null);
    const [refDebugLoading, setRefDebugLoading] = useState(false);
    const [loading, setLoading] = useState(true);

    const [isModalFeedbackOpen, setIsModalFeedbackOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("active");

    const showFeedbackModal = () => {
        setIsModalFeedbackOpen(true);
    };

    const handleFeedbackCancel = () => {
        setIsModalFeedbackOpen(false);
    };

    const handleRemoveFavorite = async (advertisementId) => {
        await removeFromFavorites(advertisementId);
        setFavorites((prev) => prev.filter((f) => f.advertisementId !== advertisementId));
    };


    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await fetchUserProfile(setUser, setLoading);
            await fetchUserAdvertisment(setAdvertisment, setLoading);
            await fetchUserAdvertismentArchive(setAdvertismentArchive, setLoading);
            await fetchUserFavorites(setFavorites, setLoading);
            await fetchUserFeedback(setFeedback, setLoading);

            const userId = localStorage.getItem("userId");
            if (userId) {
                setRefDebugUserId(userId);
                try {
                    const [wallet, tx] = await Promise.all([
                        fetchHvalaCoinWallet(userId),
                        fetchHvalaCoinTransactions(userId, 6),
                    ]);
                    setHvalaCoinBalance(wallet.balance);
                    setReferralCode(wallet.referralCode || "");
                    setHvalaCoinTx(tx);
                } catch (error) {
                    console.error("HvalaCoin load error:", error);
                }
            }
        };

        loadData();
    }, []);

    if (loading) {
        return <Spin size="large" className={styles.spinner} />;
    }

    const handleEditButtonClick = () => {
        history.push("/settings");
    }

    const getTxLabel = (tx) => {
        if (tx.reason === "first_ad_bonus") return t("hvalacoin_reason_first_ad_bonus");
        if (tx.reason === "referral_inviter_bonus") return t("hvalacoin_reason_referral_inviter_bonus");
        if (tx.reason === "referral_invitee_bonus") return t("hvalacoin_reason_referral_invitee_bonus");
        return tx.reason || t("hvalacoin_reason_other");
    };

    const referralLink = referralCode ? `${window.location.origin}/sign_up?ref=${referralCode}` : "";

    const handleCopyReferralLink = async () => {
        if (!referralLink) return;
        try {
            await navigator.clipboard.writeText(referralLink);
            message.success(t("hvalacoin_ref_copied"));
        } catch (error) {
            message.error(t("hvalacoin_ref_copy_error"));
        }
    };

    const handleShareReferralLink = async () => {
        if (!referralLink) return;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Hvala",
                    text: t("hvalacoin_ref_share_text"),
                    url: referralLink,
                });
                return;
            } catch (error) {
                // fall back to copy below
            }
        }
        handleCopyReferralLink();
    };

    const getRefDebugReasonLabel = (reason) => {
        switch (reason) {
            case "reward_granted":
                return t("ref_debug_reason_reward_granted");
            case "no_invited_by_code":
                return t("ref_debug_reason_no_invited_by_code");
            case "inviter_not_found":
                return t("ref_debug_reason_inviter_not_found");
            case "self_referral_blocked":
                return t("ref_debug_reason_self_referral_blocked");
            case "waiting_first_ad":
                return t("ref_debug_reason_waiting_first_ad");
            case "pending_function_or_processing":
                return t("ref_debug_reason_pending_function_or_processing");
            case "empty_user_id":
                return t("ref_debug_reason_empty_user_id");
            case "user_not_found":
                return t("ref_debug_reason_user_not_found");
            default:
                return reason || "—";
        }
    };

    const handleRunReferralDebug = async () => {
        setRefDebugLoading(true);
        try {
            const data = await fetchReferralDebugByUserId(refDebugUserId);
            setRefDebugData(data);
        } catch (error) {
            console.error("Referral debug error:", error);
            message.error(t("ref_debug_load_error"));
        } finally {
            setRefDebugLoading(false);
        }
    };

    return (
        <>
            <MyNavbar />
            <NavBarLogout />
            <div className={styles.container}>
                <div className={styles.profileInfo}>
                    <img src={user?.photoUrl || photoProfile} alt="user" className={styles.profileImage} />
                    <h2 className={styles.profileName}>{user?.name || 'User'}</h2>
                    <div className={styles.ratingContainer}>
                        {(user?.rating ?? user?.raiting) > 0 && (
                            <span className={styles.ratingValue}>{user?.rating ?? user?.raiting}</span>
                        )}
                        <Rate allowHalf disabled defaultValue={user?.rating ?? user?.raiting} />
                    </div>
                    <a
                        className={`${styles.reviews} ${feedback.length === 0 ? styles.inactive : ''}`}
                        onClick={feedback.length > 0 ? showFeedbackModal : null}
                    >
                        {feedback.length > 0 ? `${feedback.length} ${t('reviews')}` : t('noReviews')}
                    </a>
                    <div className={styles.coinWidget}>
                        <div className={styles.coinTitle}>{t("hvalacoin_balance_title")}</div>
                        <div className={styles.coinBalance}>{hvalaCoinBalance} HC</div>
                        <div className={styles.referralTitle}>{t("hvalacoin_ref_title")}</div>
                        {referralCode ? (
                            <>
                                <div className={styles.referralCode}>{referralCode}</div>
                                <div className={styles.referralLink} title={referralLink}>{referralLink}</div>
                                <div className={styles.referralActions}>
                                    <button type="button" className={styles.referralBtn} onClick={handleCopyReferralLink}>
                                        {t("hvalacoin_ref_copy")}
                                    </button>
                                    <button type="button" className={styles.referralBtn} onClick={handleShareReferralLink}>
                                        {t("hvalacoin_ref_share")}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className={styles.coinHistoryEmpty}>{t("hvalacoin_ref_empty")}</div>
                        )}
                        <div className={styles.coinHistoryTitle}>{t("hvalacoin_history_title")}</div>
                        {hvalaCoinTx.length > 0 ? (
                            <div className={styles.coinHistoryList}>
                                {hvalaCoinTx.map((tx) => (
                                    <div key={tx.id} className={styles.coinHistoryItem}>
                                        <span className={styles.coinHistoryReason}>{getTxLabel(tx)}</span>
                                        <span className={tx.type === "credit" ? styles.coinCredit : styles.coinDebit}>
                                            {tx.type === "credit" ? "+" : "-"}{Number(tx.amount || 0)} HC
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={styles.coinHistoryEmpty}>{t("hvalacoin_history_empty")}</div>
                        )}
                    </div>
                    {user?.role === "admin" && (
                        <div className={styles.refDebugWidget}>
                            <div className={styles.refDebugTitle}>{t("ref_debug_title")}</div>
                            <div className={styles.refDebugControls}>
                                <Input
                                    size="small"
                                    value={refDebugUserId}
                                    onChange={(e) => setRefDebugUserId(e.target.value)}
                                    placeholder={t("ref_debug_user_placeholder")}
                                />
                                <Button
                                    size="small"
                                    type="default"
                                    loading={refDebugLoading}
                                    onClick={handleRunReferralDebug}
                                >
                                    {t("ref_debug_check")}
                                </Button>
                            </div>
                            {refDebugData && (
                                <div className={styles.refDebugResult}>
                                    <div><b>{t("ref_debug_status")}:</b> {refDebugData.isRewardGranted ? t("ref_debug_yes") : t("ref_debug_no")}</div>
                                    <div><b>{t("ref_debug_reason")}:</b> {getRefDebugReasonLabel(refDebugData.statusReason || refDebugData.reason)}</div>
                                    <div><b>{t("ref_debug_referral_code")}:</b> {refDebugData.referralCode || "—"}</div>
                                    <div><b>{t("ref_debug_invited_by")}:</b> {refDebugData.invitedByReferralCode || "—"}</div>
                                    <div><b>{t("ref_debug_inviter_user")}:</b> {refDebugData.inviter?.id || "—"} {refDebugData.inviter?.name ? `(${refDebugData.inviter.name})` : ""}</div>
                                    <div><b>{t("ref_debug_ads_count")}:</b> {Number(refDebugData.adCount || 0)}</div>
                                    <div><b>{t("ref_debug_marker")}:</b> {refDebugData.hasReferralMarker ? t("ref_debug_yes") : t("ref_debug_no")}</div>
                                    <div><b>{t("ref_debug_inviter_tx")}:</b> {refDebugData.hasInviterTx ? t("ref_debug_yes") : t("ref_debug_no")}</div>
                                    <div><b>{t("ref_debug_invitee_tx")}:</b> {refDebugData.hasInviteeTx ? t("ref_debug_yes") : t("ref_debug_no")}</div>
                                </div>
                            )}
                        </div>
                    )}
                    <OrangeButton onClick={handleEditButtonClick} width='200px' height='40px' title={t('edit_profile')} />
                </div>
                <Tabs defaultActiveKey="active" onChange={setActiveTab}>
                    <TabPane
                        tab={
                            <Badge count={advertisment.length} color="#FFBF34" offset={[10, 0]}>
                                <span style={{ fontSize: '0.8rem' }}>{t('current_ads')}</span>
                            </Badge>
                        }
                        key="active"
                    >
                        <div className={styles.profileCards}>
                            {advertisment.length > 0 ? (
                                advertisment.map((advertisment, index) => (
                                    <CustomCard
                                        id={advertisment.id}
                                        key={index}
                                        user={user}
                                        images={advertisment.photoUrls}
                                        price={advertisment.price}
                                        currency={advertisment.currency}
                                        title={advertisment.title}
                                        location={advertisment.location}
                                        date={advertisment.time_creation}
                                        showButtons={true}
                                        status="active"
                                    />
                                ))
                            ) : (
                                <Empty />
                            )}
                        </div>
                    </TabPane>
                    <TabPane
                        tab={
                            <Badge count={advertismentArchive.length} color="#FFBF34" offset={[10, 0]}>
                                <span style={{ fontSize: '0.8rem' }}>{t('archive_adsv')}</span>
                            </Badge>
                        }
                        key="archived"
                    >
                        <div className={styles.profileCards}>
                            {advertismentArchive.length > 0 ? (
                                advertismentArchive.map((advertismentArchive, index) => (
                                    <CustomCard
                                        id={advertismentArchive.id}
                                        key={index}
                                        user={user}
                                        images={advertismentArchive.photoUrls}
                                        price={advertismentArchive.price}
                                        currency={advertismentArchive.currency}
                                        title={advertismentArchive.title}
                                        location={advertismentArchive.location}
                                        date={advertismentArchive.time_creation}
                                        showButtons={true}
                                        status="archived"
                                    />
                                ))
                            ) : (
                                <Empty />
                            )}
                        </div>
                    </TabPane>
                    <TabPane
                        tab={
                            <Badge count={favorites.length} color="#03989F" offset={[10, 0]}>
                                <span style={{ fontSize: '0.8rem' }}>{t('favorites')}</span>
                            </Badge>
                        }
                        key="favorites"
                    >
                        <div className={styles.profileCards}>
                            {favorites.length > 0 ? (
                                favorites.map((fav, index) => (
                                    <CustomCard
                                        id={fav.advertisementId}
                                        key={fav.id || index}
                                        user={user}
                                        images={fav.adImageUrl ? [fav.adImageUrl] : []}
                                        price={fav.adPrice}
                                        currency={fav.currency || "eur"}
                                        title={fav.adTitle}
                                        location={fav.adLocation}
                                        date={fav.addedAt}
                                        showButtons={false}
                                        status="active"
                                        showFavorite={true}
                                        isFavorite={true}
                                        onFavoriteClick={() => handleRemoveFavorite(fav.advertisementId)}
                                    />
                                ))
                            ) : (
                                <Empty description={t('no_favorites')} />
                            )}
                        </div>
                    </TabPane>
                </Tabs>
            </div>
            <Modal title="Feedbacks" open={isModalFeedbackOpen} onCancel={handleFeedbackCancel} footer={null}>
                {feedback.map((fb, index) => (
                    <article key={index}>
                        <div className="flex">
                            <img className="w-10 h-10 me-4 rounded-full" src={fb.fromUser?.photoUrl || photoProfile} alt={fb.fromUser?.name || "Пользователь"} />
                            <div className="font-medium dark:text-white me-4">
                                <p>{fb.fromUser?.name}  <time dateTime={fb.time_creation.toDate().toISOString()} className="block text-sm text-gray-500 dark:text-gray-400">
                                    {fb.time_creation.toDate().toLocaleDateString()}
                                </time></p>
                            </div>
                            <Rate className="" allowHalf disabled defaultValue={fb.rating} />
                        </div>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">{fb.description}</p>
                    </article>
                ))}
            </Modal>
        </>
    );
}

export default MyProfile;