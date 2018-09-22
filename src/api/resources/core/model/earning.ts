import { IAddress } from '../../address';

export default class Earning {

    protected distance = 0.0;

    /**
     * Get the distance between both coordinates
     * @param currentPoint number
     * @returns number
     */
    public calculate = (currentPoint: number): number[] => {
        const earning: any = (currentPoint * this.distance) / 100;
        return [ earning, this.distance ];
    }

    /**
     * Get the distance between both coordinates
     * @param home IAddress
     * @param current IAddress
     * @returns Promise<number>
     */
    public getDistance = (home: IAddress, current: IAddress): this => {
        const decimals = 2;
        const earthRadius = 6371;

        let lat1 = parseFloat(home.latitude);
        let lat2 = parseFloat(current.latitude);
        const lon1 = parseFloat(home.longitude);
        const lon2 = parseFloat(current.longitude);

        const dLat = this.toRad((lat2 - lat1));
        const dLon = this.toRad((lon2 - lon1));

        lat1 = this.toRad(lat1);
        lat2 = this.toRad(lat2);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = earthRadius * c;

        this.distance = Math.round(d * Math.pow(10, decimals)) / Math.pow(10, decimals);

        return this;
    }

    /**
     * Converts a numeric degree to Radian
     * @param value any
     */
    private toRad(value: any) {
        return value * Math.PI / 180;
    }

}
