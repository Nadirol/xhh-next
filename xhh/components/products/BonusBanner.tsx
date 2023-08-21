import { TFunction } from "next-i18next"
import { logoTextWhite } from "../../public/assets"
import Image from "next/image"

const BonusBanner = ({ t }: { t: TFunction }) => {
    return (
        <div className="w-full bg-red-500 text-neutral-50 py-8">
            <div className="w-container-large mx-auto flex -xl:gap-8 xl:justify-between items-start xl:items-center -xl:flex-col">
            <div className="flex gap-4 flex-col w-full">
                <p className='w-2/3 text-neutral-200'>
                {t('bonusParagraph')}
                </p>
                <ul className='text-xl font-semibold list-disc list-inside'>
                <li>{t('bonus1')}</li>
                <li>{t('bonus2')}</li>
                <li>{t('bonus3')}</li>
                <li>{t('bonus4')}</li>
                </ul>
                <p className='w-2/3 text-neutral-200'>{t('bonusParagraph2')}</p>
            </div>
            <Image src={logoTextWhite} alt="brand logo" className='w-[16rem] md:w-[24rem]'/>
            </div>
        </div>
    )
};

export default BonusBanner;