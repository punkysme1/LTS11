import { useState, type FormEvent } from 'react';
import { supabase } from './lib/supabase';

export default function CatalogFeedback({kind,targetId}:{kind:'bundle'|'title';targetId:string}) {
  const [open,setOpen]=useState(false);const [message,setMessage]=useState('');const [source,setSource]=useState('');
  const [contact,setContact]=useState('');const [status,setStatus]=useState('');const [busy,setBusy]=useState(false);
  async function submit(e:FormEvent){e.preventDefault();if(!supabase)return;setBusy(true);setStatus('');
    try { const {error}=await supabase.rpc('submit_nara_feedback',{p_kind:kind,p_target:targetId,p_message:message,p_source:source,p_contact:contact});
      if(error)throw error;setMessage('');setStatus('Terima kasih. Masukan terkirim kepada kurator untuk ditinjau. Metadata belum diubah.');
    }catch(e){setStatus(e instanceof Error?e.message:'Masukan belum terkirim. Silakan coba lagi.');}finally{setBusy(false);}
  }
  return <section className="catalog-feedback"><button type="button" onClick={()=>setOpen(!open)} aria-expanded={open}>Beri Masukan</button>
    {open && <form onSubmit={submit}><h2>Masukan untuk {kind==='bundle'?'bendel':'judul'} ini</h2><p>Sampaikan saran atau koreksi metadata. Kurator akan meninjaunya sebelum melakukan perubahan.</p>
      <label>Masukan atau koreksi<textarea required minLength={10} maxLength={5000} rows={5} value={message} onChange={e=>setMessage(e.target.value)}/></label>
      <label>Sumber pendukung (opsional)<textarea maxLength={2000} value={source} onChange={e=>setSource(e.target.value)}/></label>
      <label>Nama/kontak (opsional, hanya untuk kurator)<input maxLength={200} value={contact} onChange={e=>setContact(e.target.value)}/></label>
      <button type="submit" disabled={busy || !supabase}>{busy?'Mengirim…':'Kirim Masukan'}</button><p role="status">{status}</p>
    </form>}
  </section>;
}
