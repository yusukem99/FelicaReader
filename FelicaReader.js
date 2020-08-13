class FelicaReader {
    constructor(){
        this.target = {
            vendorId: 0x054c,
            productId: 0x06C3
        };
        this.device;
    }
    async getDevice(){
        try {
            let devices = await navigator.usb.getDevices();
            for( let i=0; i<devices.length; i++ ){
                let one = devices[i];
                if( one.productId == this.target.productId && one.vendorId == this.target.vendorId ){
                    this.device = one;
                    break;
                }
            }
            if(!this.device){
                this.device = await navigator.usb.requestDevice({ filters: [ this.target ]});
            }
            await this.device.open();
        } catch (e) {
            console.log(e);
            alert(e);
            throw e;
        }
        console.log(this.device);
    }

    async deviceInit(){
        try {
            await this.device.selectConfiguration(1);
            await this.device.claimInterface(0);
        } catch (e) {
            console.log(e);
            alert(e);
            try {
                this.device.close();
            } catch (e) {
                console.log(e);
            }
            throw e;
        }
    }

    async sleep(msec) {
        return new Promise(resolve => setTimeout(resolve, msec));
    }

    async send(device, data) {
        let uint8a = new Uint8Array(data);
        console.log(">>>>>>>>>>");
        console.log(uint8a);
        await device.transferOut(2, uint8a);
        await this.sleep(10);
    }
    
    async senduint8(device, uint8a) {
        console.log(">>>>>>>>>>");
        console.log(uint8a);
        await device.transferOut(2, uint8a);
        await this.sleep(10);
    }
    
    async receive(device, len) {
        console.log("<<<<<<<<<<" + len);
        let data = await device.transferIn(1, len);
        console.log(data);
        await this.sleep(10);
        let arr = [];
        for (let i = data.data.byteOffset; i < data.data.byteLength; i++) {
            arr.push(data.data.getUint8(i));
        }
        console.log(arr);
        return arr;
    }
    
    async readWithOutEncryption(){
        await this.send(this.device, [0x00, 0x00, 0xff, 0x00, 0xff, 0x00]);
        await this.send(this.device, [0x00, 0x00, 0xff, 0xff, 0xff, 0x03, 0x00, 0xfd, 0xd6, 0x2a, 0x01, 0xff, 0x00]);
        await this.receive(this.device, 6);
        await this.receive(this.device, 13);
        await this.send(this.device, [0x00, 0x00, 0xff, 0xff, 0xff, 0x03, 0x00, 0xfd, 0xd6, 0x06, 0x00, 0x24, 0x00]);
        await this.receive(this.device, 6);
        await this.receive(this.device, 13);
        await this.send(this.device, [0x00, 0x00, 0xff, 0xff, 0xff, 0x03, 0x00, 0xfd, 0xd6, 0x06, 0x00, 0x24, 0x00]);
        await this.receive(this.device, 6);
        await this.receive(this.device, 13);
        await this.send(this.device, [0x00, 0x00, 0xff, 0xff, 0xff, 0x06, 0x00, 0xfa, 0xd6, 0x00, 0x01, 0x01, 0x0f, 0x01, 0x18, 0x00]);
        await this.receive(this.device, 6);
        await this.receive(this.device, 13);
        await this.send(this.device, [0x00, 0x00, 0xff, 0xff, 0xff, 0x28, 0x00, 0xd8, 0xd6, 0x02, 0x00, 0x18, 0x01, 0x01, 0x02, 0x01, 0x03, 0x00, 0x04, 0x00, 0x05, 0x00, 0x06, 0x00, 0x07, 0x08, 0x08, 0x00, 0x09, 0x00, 0x0a, 0x00, 0x0b, 0x00, 0x0c, 0x00, 0x0e, 0x04, 0x0f, 0x00, 0x10, 0x00, 0x11, 0x00, 0x12, 0x00, 0x13, 0x06, 0x4b, 0x00]);
        await this.receive(this.device, 6);
        await this.receive(this.device, 13);
        await this.send(this.device, [0x00, 0x00, 0xff, 0xff, 0xff, 0x04, 0x00, 0xfc, 0xd6, 0x02, 0x00, 0x18, 0x10, 0x00]);
        await this.receive(this.device, 6);
        await this.receive(this.device, 13);
        await this.send(this.device, [0x00, 0x00, 0xff, 0xff, 0xff, 0x0a, 0x00, 0xf6, 0xd6, 0x04, 0x6e, 0x00, 0x06, 0x00, 0xff, 0xff, 0x01, 0x00, 0xb3, 0x00]);
        await this.receive(this.device, 6);
        
        let sendarr = this.hex_to_arr("0000ffffff0600fad60001010f011800");
        console.log(sendarr);
        await this.send(this.device, sendarr);
        await this.receive(this.device, 6);
        await this.receive(this.device, 13);

        sendarr = this.hex_to_arr("0000ffffff2800d8d60200180101020103000400050006000708080009000a000b000c000e040f0010001100120013064b00");
        await this.send(this.device, sendarr);
        await this.receive(this.device, 6);
        await this.receive(this.device, 13);
        
        sendarr = this.hex_to_arr("0000ffffff0a00f6d6042800060088b40000bc00");
        await this.send(this.device, sendarr);
        await this.receive(this.device, 6);
        let idm = (await this.receive(this.device, 35)).slice(17, 25);
        console.log(idm);
        
        
        sendarr = this.hex_to_arr("0000ffffff0600fad60001010f011800");
        await this.send(this.device, sendarr);
        await this.receive(this.device, 6);
        await this.receive(this.device, 13);
        
        sendarr = this.hex_to_arr("0000ffffff2800d8d60200180101020103000400050006000708080009000a000b000c000e040f0010001100120013064b00");
        await this.send(this.device, sendarr);
        await this.receive(this.device, 6);
        await this.receive(this.device, 13);
        
        var header = new Uint8Array([0x00, 0x00, 0xff, 0xff, 0xff]);
        
        var cmd = new Uint8Array([0xd6,0x04,0x14,0x00,0x16,0x06,0x01,0x2e,0x44,0xa3,0x59,0x01,0xa6,0xa9,0x01,0x0b,0x00,0x04,0x80,0x00,0x80,0x01,0x80,0x02,0x80,0x03])
        cmd.set(idm, 6);
        
        var left = ( cmd.length >> 8 ) & 0x00ff;
        var right = cmd.length & 0x00ff;
        var cmdlen = new Uint8Array([right, left]);
        
        var cmdlenchksum;
        cmdlenchksum = new Uint8Array( [( 256 - ( left + right ) ) % 256] );
        
        var cmdsum = 0;
        for(let i=0; i<cmd.length; i++){
            cmdsum += cmd[i];
        }
        console.log('cmdsum', cmdsum);
        var cmdchksum = new Uint8Array( [( 256 - cmdsum ) % 256, 0 ] );
        
        let length = header.length + cmdlen.length + cmdlenchksum.length + cmd.length + cmdchksum.length;
        sendarr = new Uint8Array(length);
        sendarr.set(header);
        sendarr.set(cmdlen,       header.length);
        sendarr.set(cmdlenchksum, header.length + cmdlen.length);
        sendarr.set(cmd,          header.length + cmdlen.length + cmdlenchksum.length);
        sendarr.set(cmdchksum,    header.length + cmdlen.length + cmdlenchksum.length + cmd.length)
        
        await this.senduint8(this.device, sendarr);
        await this.receive(this.device, 6);
        
        let kc = (await this.receive(this.device, 94)).slice(28, 92);
        console.log('kc', kc)
        let idmStr = '';
        if (kc.length > 0) {
            for (let i = 0; i < kc.length; i++) {
            idmStr += String.fromCharCode(kc[i]);
            }
        } else {
        }
        return idmStr;
    }
    
    hex_to_arr(str){
        var hex  = str.toString();
        var arr = [];
        for (var n = 0; n < hex.length; n += 2) {
            arr.push(parseInt(hex.substr(n, 2), 16));
        }
        return arr;
    }
}