
public class Invitation{
    private Long id;
    private String remitent;
    private String destinatary;
    private boolean accepted;

    public Invitation(String remitent, String destinatary){
        this.remitent = remitent;
        this.destinatary = destinatary;
        this.accepted = false;
    }

    public void acceptInvitation(){
        this.accepted = true;
    }

    public String getRemitent(){
        return remitent;
    }
    public String getDestinatary(){
        return destinatary;
    }
}