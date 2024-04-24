export class Helper {
    cambiarColor(colorMoneda) {
        switch (colorMoneda) {
            case "Oro":
                return "Dorado";
            case "Plata":
                return "Plateado";
            case "Bronce":
                return "Bronceado";
            default:
                return "Color no encontrado";
        }
    }
}